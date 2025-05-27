class PasswordResetsController < ApplicationController
  skip_before_action :require_login

  def new; end

  def create
    email = params[:email]

    if email.blank?
      flash.now[:danger] = "メールアドレスを入力してください"
      render :new, status: :unprocessable_entity
      return
    end

    @user = User.find_by(email: email)

    if @user
      @user.deliver_reset_password_instructions!
    end

    flash[:success]= "パスワードリセットのメールを送信しました"
    redirect_to login_path
  end

  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])
    not_authenticated if @user.blank?
  end

  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(params[:id])

    if @user.blank?
      not_authenticated
      return
    end

    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.change_password(params[:user][:password])
      redirect_to login_path
      flash[:success]= "パスワードがリセットされました"
    else
      render action: "edit"
    end
  end
end
