-- Функция для автоматического создания профиля при регистрации
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, coins, total_points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'Волонтер'),
    0,
    0
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Триггер для создания профиля
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Функция для завершения активности и начисления очков
create or replace function public.complete_activity(
  p_user_activity_id uuid
)
returns json
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_activity_id uuid;
  v_points integer;
  v_coins integer;
  v_result json;
begin
  -- Получаем данные активности
  select ua.user_id, ua.activity_id, a.points
  into v_user_id, v_activity_id, v_points
  from public.user_activities ua
  join public.activities a on a.id = ua.activity_id
  where ua.id = p_user_activity_id
  and ua.status = 'accepted';

  if v_user_id is null then
    return json_build_object('success', false, 'message', 'Activity not found or already completed');
  end if;

  -- Проверяем права доступа
  if auth.uid() != v_user_id then
    return json_build_object('success', false, 'message', 'Unauthorized');
  end if;

  -- Вычисляем монеты (10% от очков)
  v_coins := floor(v_points * 0.1);

  -- Обновляем статус активности
  update public.user_activities
  set status = 'completed',
      points_earned = v_points,
      coins_earned = v_coins,
      completed_at = now()
  where id = p_user_activity_id;

  -- Начисляем очки и монеты пользователю
  update public.profiles
  set total_points = total_points + v_points,
      coins = coins + v_coins,
      updated_at = now()
  where id = v_user_id;

  v_result := json_build_object(
    'success', true,
    'points_earned', v_points,
    'coins_earned', v_coins
  );

  return v_result;
end;
$$;
