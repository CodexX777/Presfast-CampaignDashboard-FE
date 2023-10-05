import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CustomerProvider } from "../pages/panel/e-commerce/customer/CustomerContext";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";

import Homepage from "../pages/Homepage";
import Sales from "../pages/Sales";
import Analytics from "../pages/Analytics";

import EcomOrder from "../pages/panel/e-commerce/order/OrderDefault";
import EcomSupport from "../pages/panel/e-commerce/support/Messages";
import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import EcomCustomer from "../pages/panel/e-commerce/customer/CustomerList";
import EcomCustomerDetails from "../pages/panel/e-commerce/customer/CustomerDetails";
import EcomIntegration from "../pages/panel/e-commerce/integration/Integration";
import EcomSettings from "../pages/panel/e-commerce/settings/Settings";
import EcomDashboard from "../pages/panel/e-commerce/index";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import DataTablePage from "../pages/components/table/DataTable";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import ChartPage from "../pages/components/charts/Charts";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import UserListDefault from "../pages/pre-built/user-manage/UserListDefault";
import UserListRegular from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCard from "../pages/pre-built/user-manage/UserContactCard";
import UserDetails from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileRegular from "../pages/pre-built/user-manage/UserProfileRegular";
import UserProfileSetting from "../pages/pre-built/user-manage/UserProfileSetting";
import UserProfileNotification from "../pages/pre-built/user-manage/UserProfileNotification";
import UserProfileActivity from "../pages/pre-built/user-manage/UserProfileActivity";
import OrderDefault from "../pages/pre-built/orders/OrderDefault";
import OrderRegular from "../pages/pre-built/orders/OrderRegular";
import OrderSales from "../pages/pre-built/orders/OrderSales";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import ProductCard from "../pages/pre-built/products/PresfastProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import ProductDetails from "../pages/pre-built/products/ProductDetails";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import InvoicePrint from "../pages/pre-built/invoice/InvoicePrint";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";
import ReactToastify from "../pages/components/misc/ReactToastify";

import AppMessages from "../pages/app/messages/Messages";
import Chat from "../pages/app/chat/ChatContainer";
import Kanban from "../pages/app/kanban/Kanban";
import FileManager from "../pages/app/file-manager/FileManager";
import FileManagerFiles from "../pages/app/file-manager/FileManagerFiles";
import FileManagerShared from "../pages/app/file-manager/FileManagerShared";
import FileManagerStarred from "../pages/app/file-manager/FileManagerStarred";
import FileManagerRecovery from "../pages/app/file-manager/FileManagerRecovery";
import FileManagerSettings from "../pages/app/file-manager/FileManagerSettings";
import Inbox from "../pages/app/inbox/Inbox";
import Calender from "../pages/app/calender/Calender";
import JsTreePreview from "../pages/components/misc/JsTree";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";
import KnobPreview from "../pages/components/charts/KnobPreview";

import Error404Classic from "../pages/error/404-classic";
import Error404Modern from "../pages/error/404-modern";
import Error504Modern from "../pages/error/504-modern";
import Error504Classic from "../pages/error/504-classic";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Success from "../pages/auth/Success";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";

const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      {/*Panel */}
      {/* <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/index`} component={EcomDashboard}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/orders`} component={EcomOrder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/products`} component={EcomProducts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/support`} component={EcomSupport}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer-details/:id`}
          render={(props) => (
            <CustomerProvider>
              <EcomCustomerDetails {...props} />
            </CustomerProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/settings`} component={EcomSettings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/integration`} component={EcomIntegration}></Route> */}


        {/* step-2 reconfigure the entire routing according to your needs */}
      <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
        {/*Dashboards*/}
        <Route index element={<Homepage />}></Route>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="analytics" element={<Analytics />}></Route>
        <Route path="_blank" element={<Blank />}></Route>

        <Route path="ecommerce">
          <Route path="index" element={<EcomDashboard />}></Route>
          <Route path="orders" element={<EcomOrder />}></Route>
          <Route path="products" element={<EcomProducts />}></Route>
          <Route path="support" element={<EcomSupport />}></Route>
          <Route path="settings" element={<EcomSettings />}></Route>y
          <Route path="integration" element={<EcomIntegration />}></Route>
          <Route element={<CustomerProvider />}>
            <Route path="customer" element={<EcomCustomer />}></Route>
            <Route path="customer-details/:customerId" element={<EcomCustomerDetails />}></Route>
          </Route>
        </Route>

        {/*Pre-built Pages*/}
        <Route path="project-card" element={<ProjectCardPage />}></Route>
        <Route path="project-list" element={<ProjectListPage />}></Route>

        <Route element={<UserContextProvider />}>
          <Route path="user-list-default" element={<UserListDefault />}></Route>
          <Route path="user-list-regular" element={<UserListRegular />}></Route>
          <Route path="user-list-compact" element={<UserListCompact />}></Route>
          <Route path="user-contact-card" element={<UserContactCard />}></Route>
          <Route path="user-details-regular/:userId" element={<UserDetails />}></Route>
        </Route>
        <Route>
          <Route path="user-profile-notification" element={<UserProfileNotification />}></Route>
          <Route path="user-profile-regular" element={<UserProfileRegular />}></Route>
          <Route path="user-profile-activity" element={<UserProfileActivity />}></Route>
          <Route path="user-profile-setting" element={<UserProfileSetting />}></Route>
        </Route>

        <Route path="order-list-default" element={<OrderDefault />}></Route>
        <Route path="order-list-regular" element={<OrderRegular />}></Route>
        <Route path="order-list-sales" element={<OrderSales />}></Route>
        <Route path="kyc-list-regular" element={<KycListRegular />}></Route>
        <Route path="kyc-details-regular/:kycId" element={<KycDetailsRegular />}></Route>

        <Route element={<ProductContextProvider />}>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route path="product-card" element={<ProductCard />}></Route>
          <Route path="product-details/:productId" element={<ProductDetails />}></Route>
        </Route>
        <Route path="invoice-list" element={<InvoiceList />}></Route>
        <Route path="invoice-details/:invoiceId" element={<InvoiceDetails />}></Route>
        <Route path="pricing-table" element={<PricingTable />}></Route>
        <Route path="image-gallery" element={<GalleryPreview />}></Route>

        <Route path="pages">
          <Route path="terms-policy" element={<Terms />}></Route>
          <Route path="faq" element={<Faq />}></Route>
          <Route path="regular-v1" element={<Regularv1 />}></Route>
          <Route path="regular-v2" element={<Regularv2 />}></Route>
        </Route>
        {/*Application*/}
        <Route path="app-messages" element={<AppMessages />}></Route>
        <Route path="app-chat" element={<Chat />}></Route>
        <Route path="app-calender" element={<Calender />}></Route>
        <Route path="app-inbox" element={<Inbox />}></Route>
        <Route path="app-kanban" element={<Kanban />}></Route>

        <Route path="app-file-manager">
          <Route index element={<FileManager />}></Route>
          <Route path="files" element={<FileManagerFiles />}></Route>
          <Route path="starred" element={<FileManagerStarred />}></Route>
          <Route path="shared" element={<FileManagerShared />}></Route>
          <Route path="recovery" element={<FileManagerRecovery />}></Route>
          <Route path="settings" element={<FileManagerSettings />}></Route>
        </Route>

        {/*Components*/}
        <Route path="components">
          <Route index element={<Component />}></Route>
          <Route path="accordions" element={<Accordian />}></Route>
          <Route path="alerts" element={<Alerts />}></Route>
          <Route path="avatar" element={<Avatar />}></Route>
          <Route path="badges" element={<Badges />}></Route>
          <Route path="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="button-group" element={<ButtonGroup />}></Route>
          <Route path="buttons" element={<Buttons />}></Route>
          <Route path="cards" element={<Cards />}></Route>
          <Route path="carousel" element={<Carousel />}></Route>
          <Route path="dropdowns" element={<Dropdowns />}></Route>
          <Route path="form-elements" element={<FormElements />}></Route>
          <Route path="form-layouts" element={<FormLayouts />}></Route>
          <Route path="checkbox-radio" element={<CheckboxRadio />}></Route>
          <Route path="advanced-control" element={<AdvancedControls />}></Route>
          <Route path="input-group" element={<InputGroup />}></Route>
          <Route path="form-upload" element={<FormUpload />}></Route>
          <Route path="number-spinner" element={<NumberSpinner />}></Route>
          <Route path="form-validation" element={<FormValidation />}></Route>
          <Route path="datetime-picker" element={<DateTimePicker />}></Route>
          <Route path="modals" element={<Modals />}></Route>
          <Route path="pagination" element={<Pagination />}></Route>
          <Route path="popovers" element={<Popovers />}></Route>
          <Route path="progress" element={<Progress />}></Route>
          <Route path="spinner" element={<Spinner />}></Route>
          <Route path="tabs" element={<Tabs />}></Route>
          <Route path="toast" element={<Toast />}></Route>
          <Route path="tooltips" element={<Tooltips />}></Route>
          <Route path="typography" element={<Typography />}></Route>
          <Route path="noUislider" element={<NouiSlider />}></Route>
          <Route path="wizard-basic" element={<WizardForm />}></Route>
          <Route path="quill" element={<QuillPreview />}></Route>
          <Route path="tinymce" element={<TinymcePreview />}></Route>
          <Route path="util-border" element={<UtilBorder />}></Route>
          <Route path="util-colors" element={<UtilColors />}></Route>
          <Route path="util-display" element={<UtilDisplay />}></Route>
          <Route path="util-embeded" element={<UtilEmbeded />}></Route>
          <Route path="util-flex" element={<UtilFlex />}></Route>
          <Route path="util-others" element={<UtilOthers />}></Route>
          <Route path="util-sizing" element={<UtilSizing />}></Route>
          <Route path="util-spacing" element={<UtilSpacing />}></Route>
          <Route path="util-text" element={<UtilText />}></Route>

          <Route path="widgets">
            <Route path="cards" element={<CardWidgets />}></Route>
            <Route path="charts" element={<ChartWidgets />}></Route>
            <Route path="rating" element={<RatingWidgets />}></Route>
          </Route>

          <Route path="misc">
            <Route path="slick-slider" element={<SlickPage />}></Route>
            <Route path="sweet-alert" element={<SweetAlertPage />}></Route>
            <Route path="beautiful-dnd" element={<BeautifulDnd />}></Route>
            <Route path="dual-list" element={<DualListPage />}></Route>
            <Route path="map" element={<GoogleMapPage />}></Route>
            <Route path="toastify" element={<ReactToastify />}></Route>
            <Route path="jsTree" element={<JsTreePreview />}></Route>
          </Route>
        </Route>
        <Route path="charts">
          <Route path="chartjs" element={<ChartPage />}></Route>
          <Route path="knobs" element={<KnobPreview />}></Route>
        </Route>

        <Route path="table-basic" element={<BasicTable />}></Route>
        <Route path="table-datatable" element={<DataTablePage />}></Route>
        <Route path="table-special" element={<SpecialTablePage />}></Route>
        <Route path="email-template" element={<EmailTemplate />}></Route>
        <Route path="nioicon" element={<NioIconPage />}></Route>
        <Route path="svg-icons" element={<SVGIconPage />}></Route>
      </Route>

      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route path="auth-success" element={<Success />}></Route>
        <Route path="auth-reset" element={<ForgotPassword />}></Route>
        <Route path="auth-register" element={<Register />}></Route>
        <Route path="auth-login" element={<Login />}></Route>

        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>

        <Route path="invoice-print/:invoiceId" element={<InvoicePrint />}></Route>
      </Route>
    </Routes>
  );
};
export default Router;
