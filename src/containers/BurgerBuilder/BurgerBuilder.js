import React, {Component} from 'react';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 2,
            meat: 2,
            bacon: 1
        },
        totalPrice: 5.5,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        alert('You continue');
    };

    addIngredientHandler = (type) => {
        this.setState((prevState, props) => {
            return {
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
                ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] + 1}
            };
        }, () => {
            this.updatePurchaseState();
        });
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0)
            return;

        this.setState((prevState, props) => {
            return {
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
                ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] - 1}
            };
        }, () => {
            this.updatePurchaseState();
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;