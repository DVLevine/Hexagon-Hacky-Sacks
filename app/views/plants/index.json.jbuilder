json.array!(@plants) do |plant|
  json.extract! plant, :id, :name, :quote
  json.url plant_url(plant, format: :json)
end
