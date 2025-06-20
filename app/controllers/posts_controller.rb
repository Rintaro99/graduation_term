class PostsController < ApplicationController
    before_action :require_admin, only: [:new, :create, :edit, :update, :destroy]

    def index
        @post = Post.all
    end

    def show
        @post = Post.find(params[:id])
    end

    def new
        Post.new
    end

    def create
        @post = current_user.posts.build(post_params)

        if @post.save
            redirect_to @post, notice: "投稿が作成されました。"
        else
            render :new, notice: "投稿の作成に失敗しました。"
        end
    end

    private

    def post_params
        params.require(:post).permit(:title, :body)
    end

    def require_admin
        unless current_user&.admin?
            redirect_to root_path, alert: "管理者だけがアクセスできます。"
        end
    end
end
