import { ChangeEvent, Component, FormEvent } from "react";
import { pushDataFromUser } from "../service/menu";

type Props = {
    onTrue: any
    onClose: any
}

type State = {
    payeeName: string
    product: string
    price: number
    setDate: string
}


class ExpenseTracker extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            payeeName: "",
            product: "",
            price: 0,
            setDate: this.setDefaultDate()
        }

        this.setpayee = this.setpayee.bind(this)
        this.setProduct = this.setProduct.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.loggedDate = this.loggedDate.bind(this)
    }

    setDefaultDate = () => {
        const today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    }

    setpayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName: event.target.value
        })
    }

    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product: event.target.value,
        })

    }

    setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price: parseInt(event.target.value)
        })
    }

    loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate: event.target.value,
        })
    }

    submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        const finalDate = {
            ...this.state
        }

        const data = await pushDataFromUser(finalDate)
        this.props.onTrue()
    }
    e1 = document.createElement('div')

    render() {
        const element = (
            <>
                <section>
                    <header>
                        <h1>Add New Items</h1>
                        <p> Read the below instruction before proceding:</p>
                    </header>
                    <form action="" onSubmit={this.submitHandler}>
                        <article>
                            <p>name</p>
                            <select name="Name" id="district" required value={this.state.payeeName} onChange={this.setpayee}>
                                <option value="defaultChecked">Choose</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Ramesh">Ramesh</option>
                            </select>
                        </article>

                        <article>
                            <p>Product Purchesd</p>
                            <input type="text" required value={this.state.product} onChange={this.setProduct} />
                        </article>

                        <article>
                            <p>Price</p>
                            <input type="number" required value={this.state.price} onChange={this.setPrice} />
                        </article>

                        <article>
                            <p>Date</p>
                            <input type="date" required value={this.state.setDate} onChange={this.loggedDate} />
                        </article>

                        <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                        <button className="form-button">Submit</button>
                    </form>
                </section>
            </>
        )
        return element
    }   
}
export default ExpenseTracker;