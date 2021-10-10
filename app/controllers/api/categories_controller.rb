class Api::CategoriesController < ApplicationController
  def create
    check_category = Category.find_by(category_label: params[:categoryLabel].downcase.strip)
    if check_category
      render json: check_category
    else
      category = Category.create!(category_label: params[:categoryLabel].downcase.strip)
      render json: category, status: :created
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    head :no_content
  end

  def update
    label = Category.find(params[:id])
    label.update
    render json: label
  end
end
