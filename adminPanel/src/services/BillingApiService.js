import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { localStorageService } from "./LocalStorageService";
import _EventEmitter from "../constants/emitter";
import { Download, Search } from "react-feather";

class BillingApiService {
  userData = [];
  userAuthToken = [];

  baseUrl = "http://localhost:5000/";

  constructor() {
    this.userData = this.getLoginUserData();
  }

  getLoginUserData = () => {
    var _userData = localStorageService.getPersistedData("USER_DETAILS");
    return _userData;
  };

  getLoginUserLocalData = () => {
    var _userLocalData = localStorageService.getPersistedData("USER_DETAILS");
    return _userLocalData?.accessToken;
  };

  isTokenValid = (response) => {
    if (response.status === 401) {
      localStorageService.clear();
      _EventEmitter.emit("onLogOut", "");
    }
    return response;
  };

  login = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "user/loginDashboard", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  saveUser = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "user/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  editUser = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "user/updateUser/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  getUsersDetails = async () => {
    try {
      let res = await axios.get(this.baseUrl + "user/");
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteUser = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "users/deleteUser", body);
      return res;
    } catch (e) {
      console.error("Error deleting user:", e);
      return null;
    }
  };
  

  importToExcelUsers = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "user/saveMultipleUsers/",
        body
      );
      return res;
    } catch (e) {
      // Optionally, log the error or handle it as needed
      console.error('Error importing users:', e);
      return null;
    }
  };




sendEmail= async (body) => {
  try {
    let res = await axios.post(this.baseUrl + "send-email/", body);
    return res;
  } catch (e) {
    console.error("API call error:", e);
    return null;
  }
}



  getCategoriesDetails = async () => {
    try {
      let res = await axios.get(this.baseUrl + "categories/");
      return res;
    } catch (e) {
      return null;
    }
  };

  saveCategory = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "categories/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateCategory = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "categories/updateCategory/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteCategory = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "categories/deleteCategory/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };


  // getOrganizationDetails = async () => {
  //   try {
  //     let res = await axios.get(this.baseUrl + "organizations/");
  //     return res;
  //   } catch (e) {
  //     return null;
  //   }
  // };

  getOrganizationsDetails = async () => {
    try {
      let res = await axios.get(this.baseUrl + "organizations/");
      return res;
    } catch (e) {
      return null;
    }
  };
  getOrganizationsData = async (page, limit, sortField, sortOrder, filters = {}) => {
    try {
      const sortParams = sortField && sortOrder ? `&sortField=${encodeURIComponent(sortField)}&sortOrder=${encodeURIComponent(sortOrder)}` : '';
      const filterParams = Object.keys(filters)
        .map(key => filters[key] ? `&${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}` : '')
        .join('');
      
      const url = `${this.baseUrl}organizations__?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}${sortParams}${filterParams}`;
      const res = await axios.get(url);
      
      if (res && res.data) {
        if (res.data.status) {
          if (res.data.data && Array.isArray(res.data.data.data)) {
            return res.data;
          } else {
            console.warn("No organizations found.");
            return {
              status: false,
              message: "No organizations found.",
              data: []
            };
          }
        } else {
          console.error("Invalid response status:", res.data.message);
          return {
            status: false,
            message: res.data.message || "Invalid response status.",
            data: []
          };
        }
      } else {
        console.error("Invalid response structure or empty response.");
        return {
          status: false,
          message: "Invalid response structure or empty response.",
          data: []
        };
      }
    } catch (e) {
      console.error("Error occurred while fetching organizations:", e.message);
      return {
        status: false,
        message: "Error occurred while fetching organizations.",
        data: []
      };
    }
  };

  saveOrganization = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "organizations/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateOrganization = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "organizations/updateOrganization/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteOrganization = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "organizations/deleteOrganization/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  getNewsPaperDetails = async () => {
    try {
      let res = await axios.get(this.baseUrl + "newsPaper/");
      return res;
    } catch (e) {
      return null;
    }
  };

  saveNewsPaper = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "newsPaper/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateNewsPaper = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "newsPaper/updateNewsPaper/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteNewsPaper = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "newsPaper/deleteNewsPaper/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };


  importToExcelNewspaper = async (body) => {
    try {
      let res = await axios.post(
         this.baseUrl + "newspapers/saveMultipleNewspapers/",
        body
      );
      return res;
    } catch (e) {
      // Optionally, log the error or handle it as needed
      console.error('Error importing newspapers:', e);
      return null;
    }
  };

  getAllCities = async () => {
    try {
      let res = await axios.get(this.baseUrl + "cities/");
      return res;
    } catch (e) {
      return null;
    }
  };

  saveCity = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "city/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateCity = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "city/updateCity/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteCity = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "city/deleteCity/", body);
      return res;
    } catch (e) {
      return null;
    }
  };
  
  importToExcelCities = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "cities/saveMultipleCities/",
        body
      );
      return res;
    } catch (e) {
      // Optionally, log the error or handle it as needed
      console.error('Error importing cities:', e);
      return null;
    }
  };

  getAllFAQs = async () => {
    try {
      let res = await axios.get(this.baseUrl + "FAQs/");
      return res;
    } catch (e) {
      return null;
    }
  };

  saveFAQ = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "FAQs/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateFAQ = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "FAQs/updateFAQ/", body);
      return res;
    } catch (e) {
      return null;
    }
  };
  
  importToExcelFaqs = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "FAQs/saveMultipleFaqs/",
        body
      );
      return res;
    } catch (e) {
      // Optionally, log the error or handle it as needed
      console.error('Error importing FAQs:', e);
      return null;
    }
  };

  getAllSettings = async () => {
    try {
      let res = await axios.get(this.baseUrl + "Settings/");
      return res;
    } catch (e) {
      return null;
    }
  };

  updateSetting = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "Settings/updateSetting/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  createSetting = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "Settings/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  deleteSetting = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "settings/deleteSetting", body);
      return res;
    } catch (e) {
      console.error("Error deleting setting:", e);
      return null;
    }
  };
  

  
importToExcelSettings = async (body) => {
  try {
    const res = await axios.post(
      this.baseUrl +"settings/saveMultipleSettings",
      body
    );
    return res;
  } catch (e) {
    return null;
  }
}

  


  deleteFAQ = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "FAQs/deleteFAQ/", body);
      return res;
    } catch (e) {
      return null;
    }
  };
  
// ***************tender Api's**************************
  uploadFile = async (selectedFile, name) => {
    try {
      const formData = new FormData();

      formData.append("file", selectedFile, name);

      var response = await axios.post(this.baseUrl + "tender/upload", formData);
      return response;
    } catch (error) {
      return false;
    }
  }

  


      getAllTenders = async (page, limit, sortField, sortOrder, filters = {}) => {
        try {
          const sortParams = sortField && sortOrder ? `&sortField=${encodeURIComponent(sortField)}&sortOrder=${encodeURIComponent(sortOrder)}` : '';
          const filterParams = Object.keys(filters)
            .map(key => filters[key] ? `&${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}` : '')
            .join('');
          
          const url = `${this.baseUrl}tender?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}${sortParams}${filterParams}`;
          const res = await axios.get(url);
          
          if (res && res.data) {
            if (res.data.status) {
              if (res.data.data && Array.isArray(res.data.data.data)) {
                return res.data;
              } else {
                console.warn("No tenders found.");
                return {
                  status: false,
                  message: "No tenders found.",
                  data: []
                };
              }
            } else {
              console.error("Invalid response status:", res.data.message);
              return {
                status: false,
                message: res.data.message || "Invalid response status.",
                data: []
              };
            }
          } else {
            console.error("Invalid response structure or empty response.");
            return {
              status: false,
              message: "Invalid response structure or empty response.",
              data: []
            };
          }
        } catch (e) {
          console.error("Error occurred while fetching tenders:", e.message);
          return {
            status: false,
            message: "Error occurred while fetching tenders.",
            data: []
          };
        }
      };
    
  

  saveTender = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "tender/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateTender = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "tender/updateTender/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateTendersWithNewCategory = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "TendersupdateCategory/", body);
      return res;
    }catch (error) {
      
      return null;
    }
  };

  updateTendersWithNewOrganizationInName = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "TendersupdateOrganizationInName/", body);
      return res;
    } catch (error) {
      return null;
    }
  };


  updateTendersWithNewCityInName = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "TendersupdateCityInName/", body);
      return res;
    } catch (error) {
      return null;
    }
  };
  
  
  
  
  
  deleteTender = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "tender/deleteTender/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  importToExcelTenders= async (body) => {
    try {
        const res = await axios.post(this.baseUrl+ "tenders/saveMultipleTenders", body);
        return res;
    } catch (e) {
        return null;
    }
};

  // ***************tender Api's**************************

  getAllRoles = async () => {
    try {
      let res = await axios.get(this.baseUrl + "rolesManagement/");
      return res;
    } catch (e) {
      return null;
    }
  };
  importToExcel = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "organizations/saveMultipleOrganizations/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  importToExcelCategory = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "categories/saveMultipleCategories/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  saveRoles = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "rolesManagement/", body);
      return res;
    } catch (e) {
      return null;
    }
  };



 

  getSubscriptions = async () => {
    try {
      let res = await axios.get(this.baseUrl + "Subscriptions/");
      return res;
    } catch (e) {
      return null;
    }
  };

  saveSubscription = async (body) => {
    try {
      let res = await axios.post(this.baseUrl + "Subscriptions/", body);
      return res;
    } catch (e) {
      return null;
    }
  };

  updateSubscriptions = async (body) => {
    try {
      let res = await axios.post(
        this.baseUrl + "Subscriptions/updateSubscriptions",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

c

  deleteSubscription = async (body) => {
    try {
      let res = await axios.post( 
        this.baseUrl + "Subscriptions/deleteSubscription/",
        body
      );
      return res;
    } catch (e) {
      return null;
    }
  };

  importToExcelSubscriptions= async (body) => {
    try {
        const res = await axios.post(
            this.baseUrl+"subscriptions/saveMultipleSubscriptions",
            body
        );
        return res;
    } catch (e) {
        return null;
    }
}


  // uploadFile = async (selectedFiles, invoiceid, fileNames) => {
  //   try {
  //     const formData = new FormData();
  //     var names=''
  //     Array.from(selectedFiles).forEach((file, index) => {
  //       formData.append(`files[${index}]`, file);
  //       console.log(file,'filefile')
  //       names=this.getCustomFileName(file,invoiceid)+","
  //     });
  //      let currentfiles = fileNames+names
  //      console.log(currentfiles,'currentfies')
  //     formData.append('fileNames', JSON.stringify(fileNames+names));

  //     formData.append('invoiceid', invoiceid);

  //     try {
  //       const response = await fetch(this.baseUrl + "/uploadAttachment.php", {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       const data = await response.json();
  //       return data;
  //     } catch (error) {
  //       return error;
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // DownloadPDFFile = async (invoice_data) => {
  //   // console.log("***********************************", invoice_data)
  //   var formData = new FormData();
  //   formData.append("id", invoice_data.invoiceid);
  //   formData.append("invoicedata", JSON.stringify(invoice_data));

  //   const response = await fetch(
  //     this.baseUrl + "/downloadreportpdf.php",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
  //   const json = await response.json();
  //   return json;

  // }
}
var billingApiServices = new BillingApiService();
export { billingApiServices };
