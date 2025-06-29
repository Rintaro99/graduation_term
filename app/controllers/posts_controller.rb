class PostsController < ApplicationController
    before_action :require_admin, only: [ :new, :create, :edit, :update, :destroy ]

    def index
        @posts = Post.all
    end

    def show
        @post = Post.find(params[:id])
    end

    def new
        @post = Post.new
    end

    def create
        @post = current_user.posts.build(post_params)

        if @post.save
            redirect_to @post, notice: "投稿が作成されました。"
        else
            render :new, notice: "投稿の作成に失敗しました。"
        end
    end

    def edit
        @post = Post.find(params[:id])
    end

    def update
        @post = Post.find(params[:id])
        if @post.update(post_params)
            redirect_to @post, notice: "投稿が更新されました。"
        else
            render :edit
        end
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
        redirect_to posts_path, notice: "投稿を削除しました。"
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
