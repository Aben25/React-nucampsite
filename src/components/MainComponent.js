import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect ,withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import About from './AboutComponent.js';
import Contact from './ ContactComponent';
import { connect } from 'react-redux';



const mapStateToProps = state => {
    return {
      campsites: state.campsites,
      comments: state.comments,
      partners: state.partners,
      promotions: state.promotions,
    };
}


class Main extends Component {
  

    render() {

        const Homepage = () => {
            return (
                <div>
                    <Home
                        campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                        promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                        partner={this.props.partners.filter(partner => partner.featured)[0]}
                    />
                </div>
            );
        }

        const CampsiteWithId = ({ match }) => {
            return (
                <CampsiteInfo campsite={this.props.campsites.filter(campsite => campsite.id === + match.params.campsite_id)[0]}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsite_id)}
                />
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={Homepage} />
                    <Route exact path='/Directory/' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsite_id' component={CampsiteWithId} />

                    <Route exact path='/about/' render={() => <About partners={this.props.partners} />} />
                    <Route exact path='/contactus' component={Contact} />


                    <Redirect to='/home' />


                </Switch>
                <Footer />
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps)(Main));