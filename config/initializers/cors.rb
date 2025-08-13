Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173"

    resource "/api/*",
      headers: :any,
      expose: %w[Authorization],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      max_age: 600
  end
end