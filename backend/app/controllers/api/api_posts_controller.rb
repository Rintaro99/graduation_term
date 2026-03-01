# frozen_string_literal: true

module Api
  class ApiPostsController < Api::BaseController
    before_action :set_api_post, only: %i[show update destroy]
    before_action :require_admin!, only: %i[create update destroy]

    def index
      posts = ApiPost.all.includes(:api_user)
      render json: posts.map { |post|
        {
          id: post.id,
          title: post.title,
          content: post.content,
          created_at: post.created_at,
          updated_at: post.updated_at,
          api_user: {
            id: post.api_user.id,
            name: post.api_user.name,
            email: post.api_user.email
          },
          favorited: current_api_user.api_post_favorites.exists?(api_post_id: post.id)
        }
      }
    end

    def show
      post = @api_post

      render json: {
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
        api_user: {
          id: post.api_user.id,
          name: post.api_user.name,
          email: post.api_user.email
        },
        favorited: current_api_user.api_post_favorites.exists?(api_post_id: post.id)
      }
    end

    def create
      post = current_api_user.api_posts.build(api_post_params)
      if post.save
        render json: post, status: :created
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @api_post.update(api_post_params)
        render json: @api_post
      else
        render json: { errors: @api_post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @api_post.destroy
      head :no_content
    end

    private

    def set_api_post
      @api_post = ApiPost.find(params[:id])
    end

    def api_post_params
      params.require(:api_post).permit(:title, :content)
    end

    def require_admin!
      render json: { error: '管理者のみ操作可能です' }, status: :forbidden unless current_api_user.admin?
    end
  end
end
