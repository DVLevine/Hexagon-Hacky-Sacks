json.array!(@levels) do |level|
  json.extract! level, :id, :hex, :chib_count, :found_by
  json.url level_url(level, format: :json)
end
