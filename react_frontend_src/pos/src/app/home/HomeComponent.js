import React, { Component } from "react"
import PageTemplate from "../../components/PageTemplate"
import { intlShape } from "react-intl"
import axios from 'axios'
// add proptypes

class homeComponent extends Component {
    constructor(props) {
        super(props)
    }

    PropTypes = {
        intl: intlShape.isRequired
    }

    // componentWillMount() {
    //     this.props.setLoading(true)
    // }

    componentDidMount() {
        const hostname = window && window.location && window.location.hostname
        console.log(hostname)
        console.log(typeof hostname)

        let backendHost
        (hostname === 'localhost') ?
            backendHost = "http://dev.openstudioproject.com:8000" :
            backendHost = ""

        console.log(backendHost)

        const api_url = backendHost + '/pos/get_logged_in.json'
        console.log(api_url)


        axios.get(api_url, {
            withCredentials: true
        })
        .then(function (response) {
          // handle success
          console.log(response)
          console.log(typeof response.data)
          console.log(response.data)
          // catch user not logged in
          if (response.data.error == 403) {
              console.log('redirecting to login...')
              setTimeout(() => window.location.replace(response.data.location), 10000)
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        });

        setTimeout(() => this.props.setLoadingMessage('phase 1'), 500)
        setTimeout(() => this.props.setLoadingMessage('phase 2'), 1500)
        setTimeout(() => this.props.setLoadingMessage('phase 3'), 2500)
        // ready...
        setTimeout(() => this.props.setLoading(false), 3000)
        setTimeout(() => this.props.setLoadingMessage('Loading done!'), 3500)
        
    }

    render() {
        return (
            <PageTemplate app_state={this.props.app_state}>
            <section className="Welcome">
                <div>Welcome page</div>
                <div>{this.props.app_state.loading}</div>
                <div>{this.props.app_state.loading_message}</div>
                {this.props.intl.formatMessage({ id: 'app.pos.home.hello' })}
            </section>
            </PageTemplate>
        )
    }
}

export default homeComponent
