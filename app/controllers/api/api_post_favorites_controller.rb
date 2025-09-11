class Api::ApiPostFavoritesController < Api::BaseController
    before_action :set_api_post

    def create
        favorite = current_api_user.api_post_favorites.build(api_post: @api_post)

        if favorite.save
            render json: { message: "お気に入り登録しました" }, status: :created
        else
            render json: { errors: favorite.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        favorite = current_api_user.api_post_favorites.find_by(api_post: @api_post)
        if favorite
            favorite.destroy
            render json: { message: "お気に入り解除しました" }
        else
            render json: { error: "お気に入りが見つかりません" }, status: :not_found
        end
    end

    private

    def set_api_post
        @api_post = ApiPost.find(params[:api_post_id])
    end
end
