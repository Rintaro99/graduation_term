# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 20_250_911_024_111) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'achievement_symbols', force: :cascade do |t|
    t.string 'name'
    t.string 'img'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'min_score'
  end

  create_table 'api_challenges', force: :cascade do |t|
    t.bigint 'api_user_id', null: false
    t.integer 'score'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['api_user_id'], name: 'index_api_challenges_on_api_user_id'
  end

  create_table 'api_post_favorites', force: :cascade do |t|
    t.bigint 'api_user_id', null: false
    t.bigint 'api_post_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['api_post_id'], name: 'index_api_post_favorites_on_api_post_id'
    t.index %w[api_user_id api_post_id], name: 'index_api_post_favorites_on_api_user_id_and_api_post_id',
                                         unique: true
    t.index ['api_user_id'], name: 'index_api_post_favorites_on_api_user_id'
  end

  create_table 'api_posts', force: :cascade do |t|
    t.string 'title'
    t.text 'content'
    t.bigint 'api_user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['api_user_id'], name: 'index_api_posts_on_api_user_id'
  end

  create_table 'api_users', force: :cascade do |t|
    t.string 'name'
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.boolean 'admin', default: false, null: false
    t.index ['email'], name: 'index_api_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_api_users_on_reset_password_token', unique: true
  end

  create_table 'authentications', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.string 'provider', null: false
    t.string 'uid', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_authentications_on_user_id'
  end

  create_table 'challenges', force: :cascade do |t|
    t.bigint 'user_id'
    t.integer 'score'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_challenges_on_user_id'
  end

  create_table 'choices', force: :cascade do |t|
    t.bigint 'question_id', null: false
    t.string 'content'
    t.boolean 'is_correct'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['question_id'], name: 'index_choices_on_question_id'
  end

  create_table 'jwt_denylists', force: :cascade do |t|
    t.string 'jti'
    t.datetime 'exp'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'posts', force: :cascade do |t|
    t.string 'title'
    t.text 'body'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_posts_on_user_id'
  end

  create_table 'questions', force: :cascade do |t|
    t.string 'content'
    t.text 'explanation'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'user_symbols', force: :cascade do |t|
    t.bigint 'achievement_symbol_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'api_user_id', null: false
    t.index ['achievement_symbol_id'], name: 'index_user_symbols_on_achievement_symbol_id'
    t.index ['api_user_id'], name: 'index_user_symbols_on_api_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'email', null: false
    t.string 'crypted_password'
    t.string 'salt'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_token_expires_at'
    t.datetime 'reset_password_email_sent_at'
    t.boolean 'admin'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token'
  end

  add_foreign_key 'api_challenges', 'api_users'
  add_foreign_key 'api_post_favorites', 'api_posts'
  add_foreign_key 'api_post_favorites', 'api_users'
  add_foreign_key 'api_posts', 'api_users'
  add_foreign_key 'authentications', 'users'
  add_foreign_key 'choices', 'questions'
  add_foreign_key 'posts', 'users'
  add_foreign_key 'user_symbols', 'achievement_symbols'
  add_foreign_key 'user_symbols', 'api_users'
end
