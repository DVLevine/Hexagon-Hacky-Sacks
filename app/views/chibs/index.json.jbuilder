json.array!(@chibs) do |chib|
  json.extract! chib, :id, :level_id, :user_id, :mochi, :color
  json.url chib_url(chib, format: :json)
end
