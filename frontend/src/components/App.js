import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ImagePopup } from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import { Register } from './Register.js';
import { Login } from './Login.js';
import { InfoTooltip } from './InfoTooltip.js';
import { register, authorize, getContent } from '../utils/Auth.js';

function App() {

  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [userData, setUserData] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards().then(data => setCards(data))
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ name: card.name, link: card.link })
  };

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data).then((newData) => {
      setCurrentUser(newData);
      setIsEditProfilePopupOpen(false);
    })
      .catch(err => console.log(err));
  };

  const handleUpdateAvatar = (url) => {
    api.updateAvatar(url.avatar)
      .then(data => {
        setCurrentUser(data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => console.log(err));
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.likeCardToggle(card._id, isLiked).then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  };

  const handleCardDelete = (card) => {
    api.removeCard(card._id).then(() => {
      setCards(cards.filter(c => c._id !== card._id));
    })
      .catch(err => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    })
      .catch(err => console.log(err));
  };

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getContent(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setUserData(res.data.email);
          history.push('/');
        }
      })
        .catch(err => console.log(err));
    }
  };

  const handleLogin = (email, password) => {
    authorize(email, password).then(data => {
      if (data.token) {
        setLoggedIn(true);
        history.push('/');
      } else {
        setIsSuccessful(false);
        setIsInfoTooltipPopupOpen(true);
      }
    })
      .catch(err => {
        console.log(err)
        setIsSuccessful(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  const handleRegister = (email, password) => {
    register(email, password).then(res => {
      if (res) {
        setIsSuccessful(true);
        setIsInfoTooltipPopupOpen(true);
        history.push('/signin');
      } else {
        setIsSuccessful(false);
        setIsInfoTooltipPopupOpen(true);
      }
    })
      .catch(err => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipPopupOpen(true);
      })
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/">
            {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/signin" />)}
          </Route>
        </Switch>
        {loggedIn ? <Footer /> : ""}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccessful={isSuccessful} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
