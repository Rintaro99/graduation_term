console.log("✅ application.js 読み込まれました！")


// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
Rails.start()

import * as Turbo from "@hotwired/turbo"
window.Turbo = Turbo
Turbo.start()

// import "@hotwired/turbo-rails"

// window.Rails = Rails

import React from "react"
import { createRoot } from "react-dom/client"
import HelloReact from "./components/HelloReact"

const container = document.getElementById("react-root")
if (container) {
  const root = createRoot(container)
  root.render(<HelloReact />)
}
