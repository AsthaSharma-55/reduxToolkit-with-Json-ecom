import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UseScript = (url) => {
  useEffect(
    (url) => {
      const script = document.createElement("script");
      script.src = url;
      console.log(script);
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    },
    [url]
  );
};
function usescript(url) {
  const script = document.createElement("script");
  script.src = url;
  console.log(script);

  document.body.appendChild(script);
}

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve("Yo script is running", true);
    };
    script.onerror = () => {
      resolve("Yo script failed", false);
    };
    document.body.appendChild(script);
  });
}

export const Payment = createContext();

export function PaymentProvider({ children }) {
  const navigate = useNavigate();
  async function openRazorPay() {
    try {
      const scriptResponse = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      console.log("Step 1. Script Loads ", { scriptResponse });
      if (!scriptResponse) {
        console.log("yo first Network error");
        return;
      }
      const response1 = await axios.post(
        "https://razorpay-integration.prratim.repl.co/razorpay"
      );
      if (!response1.data) {
        alert("Network error while getting data");
      }
      console.log("Step2. Request to the server to get order id,inr,amount", {
        response1
      });
      console.log(response1.data.id);

      const options = {
        key: "rzp_test_YEpSVKzl4ENeJR",
        amount: response1.data.amount,
        currency: response1.data.currency,
        name: "My comapny name",
        description: "Test Transaction",
        image: "https://razorpay-integration.prratim.repl.co/logo.svg",
        order_id: response1.data.id,
        handler: async function (response) {
          console.log(
            "Step4. Razorpay sends us a response with the signature",
            response
          );
          try {
            const result = await axios.post(
              "https://razorpay-integration.prratim.repl.co/success",
              {
                orderCreationId: response1.data.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                amount: response1.data.amount,

                currency: response1.data.currency
              }
            );
            console.log("Step5. We verify the signature at the server", result);
            console.log(result.status);
            if (result.status === 200) {
              navigate("/sucess");
              setTimeout(() => {
                navigate("/wyzr");
              }, 2000);
            }
          } catch (error) {
            console.log(error.response);
            console.log("not running here");
          }
        }
      };
      const paymentObject = window.Razorpay(options);
      console.log("Step3. Popup of RazorPay Model", { paymentObject });
      paymentObject.open();
    } catch (error) {
      console.log("Error occured");
    }
  }

  return (
    <Payment.Provider value={{ openRazorPay }}>{children}</Payment.Provider>
  );
}

export function usePayment() {
  return useContext(Payment);
}
