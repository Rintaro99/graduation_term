# spec/models/question_spec.rb
require 'rails_helper'

RSpec.describe Question, type: :model do
  describe '関連付け' do
    it '複数のchoicesを持つことができる' do
      question = create(:question)
      choice1 = create(:choice, question: question)
      choice2 = create(:choice, question: question)

      expect(question.choices).to include(choice1, choice2)
      expect(question.choices.count).to eq(2)
    end

    it 'questionが削除されるとchoicesも削除される' do
      question = create(:question)
      create(:choice, question: question)

      expect { question.destroy }.to change { Choice.count }.by(-1)
    end
  end
end
