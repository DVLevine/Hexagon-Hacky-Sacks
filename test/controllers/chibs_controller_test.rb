require 'test_helper'

class ChibsControllerTest < ActionController::TestCase
  setup do
    @chib = chibs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:chibs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create chib" do
    assert_difference('Chib.count') do
      post :create, chib: { color: @chib.color, level_id: @chib.level_id, mochi: @chib.mochi, user_id: @chib.user_id }
    end

    assert_redirected_to chib_path(assigns(:chib))
  end

  test "should show chib" do
    get :show, id: @chib
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @chib
    assert_response :success
  end

  test "should update chib" do
    patch :update, id: @chib, chib: { color: @chib.color, level_id: @chib.level_id, mochi: @chib.mochi, user_id: @chib.user_id }
    assert_redirected_to chib_path(assigns(:chib))
  end

  test "should destroy chib" do
    assert_difference('Chib.count', -1) do
      delete :destroy, id: @chib
    end

    assert_redirected_to chibs_path
  end
end
