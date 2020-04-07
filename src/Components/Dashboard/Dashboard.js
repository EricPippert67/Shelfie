import React, {Component} from 'react' 
import Product from '../Product/Product'
// import Form from '../Form/Form'
import axios from 'axios'

class Dashboard extends Component{

    constructor(){
        super()

        this.state = {
            inventory: []
            
      
          }
        this.delete = this.delete.bind(this)
    }

    componentDidMount(){
        axios.get('/api/inventory')
        .then(response => {
          this.setState({inventory: response.data})
        })
      }

    delete(id) {
        axios.delete(`/api/inventory/${id}`)
        .then(response => {
            this.componentDidMount();
            
        })
    }

    render(){
        
        const dashboardDisplay = this.state.inventory.map((element, index) => {
            return <Product key={index} product={element} delete={this.delete} />
        })
        return(
            <div>
                {dashboardDisplay}
            </div>
        )
    }
}

export default Dashboard