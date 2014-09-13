require 'test_helper'

class RaindropsControllerTest < ActionController::TestCase
  setup do
    @raindrop = raindrops(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:raindrops)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create raindrop" do
    assert_difference('Raindrop.count') do
      post :create, raindrop: { shiny: @raindrop.shiny, water: @raindrop.water }
    end

    assert_redirected_to raindrop_path(assigns(:raindrop))
  end

  test "should show raindrop" do
    get :show, id: @raindrop
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @raindrop
    assert_response :success
  end

  test "should update raindrop" do
    patch :update, id: @raindrop, raindrop: { shiny: @raindrop.shiny, water: @raindrop.water }
    assert_redirected_to raindrop_path(assigns(:raindrop))
  end

  test "should destroy raindrop" do
    assert_difference('Raindrop.count', -1) do
      delete :destroy, id: @raindrop
    end

    assert_redirected_to raindrops_path
  end
end
