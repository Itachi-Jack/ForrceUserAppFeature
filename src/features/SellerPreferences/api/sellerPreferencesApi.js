
import api from "../../../services/apiClient";

export const getSellerPreference = async () => {
  try {
    const response = await api.get(
      "/api/method/fis_cart.api.v1.page.seller.preferences.index"
    );
    
    console.log("Response data:", response.data.message[0]);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const updateSellerPreference = async (payload) => {
  try {
    const res = await api.put('/api/method/fis_cart.api.v1.page.seller.update_preference.index', payload);
     console.log("PUT response:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const scanSeller = async (sellerCode) => {
  try {
    const res = await api.post('/api/method/fis_cart.api.v1.page.seller.save_preferred_seller_by_qr.index',
      {
        seller_code : sellerCode,
      }
    );
    return res.data;

  } catch (err) {
    console.log(err);
    throw err;
  }

}