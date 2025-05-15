class AnswersController < ApplicationController
    def check
        choice = Choice.find(params[:choice_id])
        @question = choice.question
        @correct = choice.is_correct

        # ★ここで将来的にユーザー別の履歴を残すのも可能
        # current_user.answers.create(question: @question, choice: choice, correct: @correct)
        session[:answered_questions] ||= []
        session[:answered_questions] << @question.id unless session[:answered_questions].include?(@question.id)
    end
end
