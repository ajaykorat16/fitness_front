import visa from "../img/cards/visa.png";
import americanexpress from "../img/cards/americanexpress.png";
import dinersclub from "../img/cards/dinersclub.jpg";
import discover from "../img/cards/discover.jpg";
import elo from "../img/cards/elo.png";
import hiper from "../img/cards/hiper.png";
import jcb from "../img/cards/jcb.png";
import mastercard from "../img/cards/mastercard.png";
import mir from "../img/cards/mir.png";
import unionpay from "../img/cards/unionpay.png";

export function getCardImage(type) {
  switch (type) {
    case "visa":
      return visa;
    case "mastercard":
      return mastercard;
    case "amex":
      return americanexpress;
    case "diners club":
      return dinersclub;
    case "discover":
      return discover;
    case "jcb":
      return jcb;
    case "unionpay":
      return unionpay;
    case "maestro":
      return mastercard;
    case "mir":
      return mir;
    case "elo":
      return elo;
    case "hiper":
      return hiper;
    case "hipercard":
      return hiper;
    default:
      return visa;
  }
}
