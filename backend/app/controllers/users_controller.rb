# frozen_string_literal: true

class UsersController < ApplicationController
  # skip_before_action :require_login, only: %i[new create]
  before_action :set_user, only: %i[show edit update userpage]

  def show
    current_user&.update_symbols!
  end

  def new
    @user = User.new
  end

  def edit
    # 編集対象のフィールドをparamsで受け取る
    @field = params[:field]
    render partial: 'edit_field', formats: [:html]
  end

  def update
    if @user.update(user_params)
      redirect_to mypage_path, notice: '更新しました'
    else
      render :show
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  def userpage
    logger.debug "[DEBUG] userpage accessed by user: #{current_user.inspect}"
    @user = current_user
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :terms_of_service)
  end
end
