import React, { Component } from 'react'
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import About from './AboutComponent.js';
import Contact from './ ContactComponent';
import { connect } from 'react-redux';
import { actions } from "react-redux-form"
import {
  postComment,
  fetchCampsites,
  fetchComments,
  fetchPromotions,
} from "../redux/ActionCreator";

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  fetchComments: () => fetchComments(),
  fetchPromotions: () => fetchPromotions(),
  resetFeedbackForm: () => actions.reset("feedbackForm")
};



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions,
    };
}


class Main extends Component {
  componentDidMount() {
     this.props.fetchCampsites();
     this.props.fetchComments();
     this.props.fetchPromotions();
  }

  render() {
    const Homepage = () => {
      return (
        <div>
          <Home
            campsite={
              this.props.campsites.campsites.filter(
                (campsite) => campsite.featured
              )[0]
            }
            campsitesLoading={this.props.campsites.isLoading}
            campsitesErrMess={this.props.campsites.errMess}
            promotion={
              this.props.promotions.promotions.filter(
                (promotion) => promotion.featured
              )[0]
            }
            promotionLoading={this.props.promotions.isLoading}
            promotionErrMess={this.props.promotions.errMess}
            partner={
              this.props.partners.filter((partner) => partner.featured)[0]
            }
          />
        </div>
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route
            exact
            path="/Directory/"
            render={() => <Directory campsites={this.props.campsites} />}
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />

          <Route
            exact
            path="/about/"
            render={() => <About partners={this.props.partners} />}
          />
          <Route
            exact
            path="/contactus"
            render={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />

          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
