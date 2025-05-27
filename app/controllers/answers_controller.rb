class AnswersController < ApplicationController
    def check
        puts "===== params ====="
        puts params.inspect
        puts "=================="

        current_question = Question.find_by(id: params[:question_id])

        # 未選択チェック
        if params[:choice_id].blank?
            redirect_to question_path(current_question), alert: "選択肢を選んでから回答してください！"
            return
        end

        choice = Choice.find(params[:choice_id])
        @question = choice.question
        @correct = choice.is_correct

        # ★ここで将来的にユーザー別の履歴を残すのも可能
        # current_user.answers.create(question: @question, choice: choice, correct: @correct)
        session[:answered_questions] ||= []
        session[:answered_questions] << @question.id unless session[:answered_questions].include?(@question.id)

        # 正解IDを保存
        session[:correct_questions] ||= []
        if @correct && !session[:correct_questions].include?(@question.id)
            session[:correct_questions] << @question.id
        end

        # 全問終了チェック
        if session[:answered_questions].size >= Question.count
            redirect_to results_path and return
        end
    end
end
