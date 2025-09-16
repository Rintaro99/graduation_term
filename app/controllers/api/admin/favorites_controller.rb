class Api::Admin::FavoritesController < Api::BaseController
  before_action :require_admin!

  def index
    favorites = ApiPostFavorite.includes(:api_user, :api_post)

    render json: favorites.map { |fav|
      {
        user: {
          id: fav.api_user.id,
          name: fav.api_user.name,
          email: fav.api_user.email
        },
        post: {
          id: fav.api_post.id,
          title: fav.api_post.title
        }
      }
    }
  end
end
