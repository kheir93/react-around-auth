import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Tooltip from "./Tooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { register, authorize, checkToken } from "../utils/auth";
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {

  //State management//
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDelete, setCardDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipWindow, setTooltipWindow] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const history = useHistory();

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("token")
        }
      })
        .catch((err) => console.log(err))
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
    history.push("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/signin');
  }

  const handleRegisterSubmit = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res) {
          setTooltipWindow(true);
          history.push('/signin');
        } else {
          console.log('Something went wrong.');
          setTooltipOpen(true);
          setTooltipWindow(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipWindow(false);
      })
      .finally(() => setTooltipOpen(true))
    };

  const handleLoginSubmit = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data) {
          handleLogin();
          handleTokenCheck();
        }
      })
      .catch((err) => {
        console.error(err)
      }
    )}

  //Cards and profile rendering//
  useEffect(() => {
    api.getAppInfo()
      .then(([profile, cardData]) => {
        setCurrentUser(profile)
        setCards(cardData)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  //Profile popup validation//
  function handleUpdateUser(data) {
    api.setUserInfo({
      name: data.name,
      about: data.about
    })
      .then((profile) => {
        setCurrentUser(profile)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  //Avatar popup validation//
  function handleUpdateAvatar(user) {
    api.setUserAvatar({ avatar: user.avatar })
      .then((profile) => {
        setCurrentUser(profile)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  //Add new card//
  function handleAddPlaceSubmit(data) {
    api.newCard({
      title: data.title,
      link: data.link
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  //Delete button//
  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setCardDelete(card)
  };

  function handleCardDelete(card) {
    api.removeCard({ cardId: card._id })
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Profile button//
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  //Add button//
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  //Avatar icon//
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  //Image zoomin//
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  //Popup closing management//
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setTooltipOpen(false);
  }

  //Escape key binding//
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  //Close popups on overlay clicks//
  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups()
    }
  };

  //Likes handling//
  function handleCardLike(card) {
    //Like status//
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    //Like status management//
    if (isLiked) {
      api.removeLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
        )
      })
        .catch(err => console.log(err));
    } else {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        )
      })
        .catch(err => console.log(err));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header logout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} >
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardDelete={handleDeleteClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}>
            </Main>
          </ProtectedRoute>
          <Route path="/signin">
            <Login handleLoginSubmit={handleLoginSubmit}  />
          </Route>
          <Route path="/signup">
            <Register handleRegisterSubmit={handleRegisterSubmit} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onAddPlaceSubmit={handleAddPlaceSubmit} />

        <DeleteConfirmationPopup isOpen={isDeletePopupOpen} card={cardDelete} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onDeleteConfirmation={handleCardDelete} />

        <ImagePopup card={selectedCard} name={'place'} onClose={closeAllPopups} overlayCloseByClick={closeAllPopups} onOverlayClick={handleOverlayClick} />
        <Tooltip isOpen={tooltipOpen} unionStatus={tooltipWindow} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}></Tooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn: false,
//       editProfilePopupOpen: false,
//       addPlacePopupOpen: false,
//       editAvatarPopupOpen: false,
//       deletePopupOpen: false,
//       selectedCard: null,
//       cardDelete: null,
//       currentUser: {},
//       cards: [],
//     }

//     this.handleEditProfileClick = this.handleEditProfileClick.bind(this);
//     this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this);
//     this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this);
//     this.onCardDelete = this.handleCardClick.bind(this);
//     this.handleCarDelete = this.handleCarDelete.bind(this);
//     this.closeAllPopups = this.closeAllPopups.bind(this);
//     this.handleOverlayClick = this.handleOverlayClick.bind(this);
//     this.handleUpdateUser = this.handleUpdateUser.bind(this);
//     this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
//     this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
//     this.handleCardLike = this.handleCardLike.bind(this);
//     //this.handleLogin = this.handleLogin.bind(this);
//     //this.handleTokenCheck = this.handleTokenCheck.bind(this);
//     //this.handleLogout = this.handleLogout.bind(this);
//   }

//   //State management//



//   //Escape key bind//
//   // function escKey(evt) {
//   //   evt.preventDefault();
//   //   if (evt.key === "Escape") {
//   //   return closeAllPopups()
//   //   }
//   // };

//   componentDidMount() {
//     this.escapeKey();
//     this.getProfileInfo();
//   }

//   getProfileInfo() {
//     api.getAppInfo()
//       .then(([profile, cardData]) => {
//         this.setState({
//           currentUser: {profile},
//           cards: [cardData]
//         });

//       })
//       .catch(err => console.log(err))
//   };

//    //Profile popup validation//
//   handleUpdateUser(data) {
//   api.setUserInfo({
//     name: data.name,
//     about: data.about
//   })
//     .then((profile) => {
//       this.setState({
//         currentUser: profile
//       })
//       this.closeAllPopups()
//     })
//     .catch(err => console.log(err))
// };

// //Avatar popup validation//
// handleUpdateAvatar(user) {
//   api.setUserAvatar({ avatar: user.avatar })
//     .then((profile) => {
//       this.setState({
//         currentUser: profile
//       })
//       this.closeAllPopups()
//     })
//     .catch(err => console.log(err))
// };

// //Add new card//
// handleAddPlaceSubmit(data) {
//   api.newCard({
//     title: data.title,
//     link: data.link
//   })
//     .then((newCard, ...cards) => {
//       this.setState({
//         cards: [newCard, ...cards]
//       })
//       this.closeAllPopups()
//     })
//     .catch(err => console.log(err))
// };


//   //Profile button//
//   handleEditProfileClick(e) {
//     this.setState({
//       editProfilePopupOpen: true
//     })
//   };

//   //Add button//
//   handleAddPlaceClick(e) {
//      this.setState({
//       addPlacePopupOpen: true
//     })
//   };

//   //Avatar icon//
//   handleEditAvatarClick(e) {
//     this.setState({
//       editAvatarPopupOpen: true
//     })
//   };

//   //Image zoomin//
//   handleCardClick(card) {
//     this.setState({
//       selectedCard: card
//     })
//   };

//   //Delete button//
//   handleCarDelete(card) {
//     this.setState({
//       deletePopupOpen: card
//     })
//   };

//   componentDidMount() {
//     this.escapeKey();
//   }

//   escapeKey() {
//     this.closeByEscape = (e) => {
//       if (e.key === 'Escape') {
//         this.closeAllPopups();
//       }
//     }
//     document.addEventListener('keydown', this.closeByEscape)
//     return () => document.removeEventListener('keydown', this.closeByEscape)
//   }

//   //Popup closing management//
//   closeAllPopups() {
//     this.setState({
//       editAvatarPopupOpen: false,
//       addPlacePopupOpen: false,
//       editProfilePopupOpen: false,
//       deletePopupOpen: false,
//       selectedCard: null,
//     })
//     document.removeEventListener("keyup", this._handleEscUp);
//   };

//   handleOverlayClick(e) {
//     if (e.target.classList.contains("popup")) {
//     this.closeAllPopups()
//     }
//   };

//   //Likes handling//
//   handleCardLike(card) {
//   //Like status//
//   const isLiked = card.likes.some(user => user._id === this.state.currentUser._id);
//   //Like status management//
//   if (isLiked) {
//     api.removeLike(card._id, isLiked).then((newCard) => {
//       this.state.cards((state) => state.map((currentCard) =>
//         currentCard._id === card._id ? newCard : currentCard
//       )
//       )
//     })
//       .catch(err => console.log(err));
//   } else {
//     api.addLike(card._id, !isLiked).then((newCard) => {
//       this.state.setCards((state) =>
//         state.map((currentCard) =>
//           currentCard._id === card._id ? newCard : currentCard
//         )
//       )
//     })
//       .catch(err => console.log(err));
//   }
// }

//   render() {
//     return (
//       <CurrentUserContext.Provider value={this.state.currentUser}>
//         <div className="root">
//           <Header />
//           <Main
//             onEditAvatarClick={this.handleEditAvatarClick}
//             onEditProfileClick={this.handleEditProfileClick}
//             onAddPlaceClick={this.handleAddPlaceClick}
//             onCardDelete={this.handleDeleteClick}
//             onCardClick={this.handleCardClick}
//             onCardLike={this.handleCardLike}
//             cards={this.cards}
//           />

//           <EditAvatarPopup isOpen={this.state.editAvatarPopupOpen} onClose={this.closeAllPopups} onOverlayClick={this.handleOverlayClick} onUpdateAvatar={this.handleUpdateAvatar} />

//           <EditProfilePopup isOpen={this.state.editProfilePopupOpen} onClose={this.closeAllPopups} onOverlayClick={this.handleOverlayClick} onUpdateUser={this.handleUpdateUser} />

//           <AddPlacePopup isOpen={this.state.addPlacePopupOpen} onClose={this.closeAllPopups} onOverlayClick={this.handleOverlayClick} onAddPlaceSubmit={this.handleAddPlaceSubmit} />

//           <DeleteConfirmationPopup isOpen={this.state.deletePopupOpen} card={this.cardDelete} onClose={this.closeAllPopups} onOverlayClick={this.handleOverlayClick} onDeleteConfirmation={this.handleCardDelete} />

//           <ImagePopup card={this.state.selectedCard} name={'place'} onClose={this.closeAllPopups} overlayCloseByClick={this.closeAllPopups} onOverlayClick={this.handleOverlayClick} />

//           <Footer />
//         </div>
//       </CurrentUserContext.Provider>
//     );
//   }
// }


// export default App;
