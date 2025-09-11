class Api::ApiPostsController < Api::BaseController
    before_action :set_api_post, only: [ :show, :update, :destroy ]
    before_action :require_admin!, only: [ :create, :update, :destroy ]

    def index
        posts = ApiPost.all.includes(:api_user)
        render json: posts.as_json(include: { api_user: { only: [ :id, :email, :name ] } })
    end

    def show
        render json: @api_post.as_json(include: { api_user: { only: [ :id, :email, :name ] } })
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
        render json: { error: "管理者のみ操作可能です" }, status: :forbidden unless current_api_user.admin?
    end
end
