import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import '../../CSS/chatbot.css'

// permet de modifier le thème du chat bot
const config ={
    width: "400px",
    height: "500px",
    floating: true,
  };

  const theme = {
    background: '#fffffff0',
    fontFamily: 'Helvetica Neue',
  
    headerBgColor: '#003153',
    headerFontColor: '#fffffff0',
    headerFontSize: '20px',
    

    botBubbleColor: 'rgb(237, 100, 54)',
    botFontColor: ' rgb(24, 23, 22)',
  
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  /*Le corps du robot
  * c'est la logique -> l'utilisateur clique sur une question est dépendament de ce qu'il a choisi,
  * la réponse lui sera affiché
  */
class FormeSimple extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
          <ChatBot 
             steps={[
                {
                  id:'intro', 
                  options:[
                    {value:'l', label:'Offrez vous le service de livraison?', trigger:'Livraison'},
                    {value:'o', label:"Qu' offrez vous sur Le Gadget's Factorie ? ", trigger:'Offre'},
                    {value:'p', label:"Quel méthode de paiement est accepté?", trigger:'Paiement'},
                    {value:'m', label:"Comment magasiner?", trigger:'magasin'},
                    ] 
                  
                },
                {
                    id:'magasin', 
                    message:'Vous pouvez ajouter au panier tous ce qui vous plait, pour passer le paiement il faut soit vous connecter ou vous créer un compte 😉', 
                    trigger:'intro',
                  },
               
                {
                  id:'Paiement', 
                  message:'PayPal, Visa, masterCard, Amex', 
                  trigger:'intro',
                },
                {
                  id:'Offre', 
                  message:"Nous vous offrons les tablettes, les portables, les écouteurs, en bref, tous ce dont vous avez besoin!! 😊",              
                  trigger:'intro',
                },
                {
                    id:'Livraison', 
                    message:'Oui, nous offrons le service de livraison', 
                    trigger:'intro',
                  },
                 
              ]}
            {...config}
          />
            </ThemeProvider>
            );
          }
    
        }
    

    export default FormeSimple;