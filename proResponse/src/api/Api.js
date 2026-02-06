/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import axios from "axios";
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["JsonApi"] = "application/vnd.api+json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  instance;
  securityData = null;
  securityWorker;
  secure;
  format;
  constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  mergeRequestParams(params1, params2) {
    const method = params1.method || (params2 && params2.method);
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase()]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  stringifyFormItem(formItem) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }
  createFormData(input) {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent = property instanceof Array ? property : [property];
      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }
      return formData;
    }, new FormData());
  }
  request = async ({ secure, path, type, query, format, body, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;
    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body);
    }
    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }
    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api extends HttpClient {
  api = {
    /**
     * No description
     *
     * @tags review-controller
     * @name GetReview
     * @request GET:/api/reviews/{estimateNo}
     */
    getReview: (estimateNo, params = {}) =>
      this.request({
        path: `/api/reviews/${estimateNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags review-controller
     * @name DeleteByEstimateNo
     * @request PUT:/api/reviews/{estimateNo}
     */
    deleteByEstimateNo: (estimateNo, params = {}) =>
      this.request({
        path: `/api/reviews/${estimateNo}`,
        method: "PUT",
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name ChangePassword
     * @request PUT:/api/members/me/password
     */
    changePassword: (data, params = {}) =>
      this.request({
        path: `/api/members/me/password`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name ChangeEmail
     * @request PUT:/api/members/me/email
     */
    changeEmail: (query, params = {}) =>
      this.request({
        path: `/api/members/me/email`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertForEdit
     * @request GET:/api/experts/me
     */
    getExpertForEdit: (params = {}) =>
      this.request({
        path: `/api/experts/me`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name UpdateExpert
     * @request PUT:/api/experts/me
     */
    updateExpert: (query, params = {}) =>
      this.request({
        path: `/api/experts/me`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name UpdateRequestEstimate
     * @request PUT:/api/estimate/{requestNo}
     */
    updateRequestEstimate: (requestNo, query, params = {}) =>
      this.request({
        path: `/api/estimate/${requestNo}`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name DeleteEstimateByRequestNo
     * @request DELETE:/api/estimate/{requestNo}
     */
    deleteEstimateByRequestNo: (requestNo, params = {}) =>
      this.request({
        path: `/api/estimate/${requestNo}`,
        method: "DELETE",
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name UpdateEstimateStatus
     * @request PUT:/api/estimate/{requestNo}/accept
     */
    updateEstimateStatus: (requestNo, params = {}) =>
      this.request({
        path: `/api/estimate/${requestNo}/accept`,
        method: "PUT",
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-report-controller
     * @name UpdateReportStatus
     * @request PUT:/api/admin/reports/{reportNo}/status
     */
    updateReportStatus: (reportNo, query, params = {}) =>
      this.request({
        path: `/api/admin/reports/${reportNo}/status`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-report-controller
     * @name UpdateAnswer
     * @request PUT:/api/admin/reports/{reportNo}/answer
     */
    updateAnswer: (reportNo, query, params = {}) =>
      this.request({
        path: `/api/admin/reports/${reportNo}/answer`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-member-controller
     * @name UpdateMemberStatus
     * @request PUT:/api/admin/members/{userNo}/status
     */
    updateMemberStatus: (userNo, query, params = {}) =>
      this.request({
        path: `/api/admin/members/${userNo}/status`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-member-controller
     * @name UpdateUserRole
     * @request PUT:/api/admin/members/{userNo}/role
     */
    updateUserRole: (userNo, query, params = {}) =>
      this.request({
        path: `/api/admin/members/${userNo}/role`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-member-controller
     * @name UpdatePenaltyStatus
     * @request PUT:/api/admin/members/{userNo}/penalty
     */
    updatePenaltyStatus: (userNo, query, params = {}) =>
      this.request({
        path: `/api/admin/members/${userNo}/penalty`,
        method: "PUT",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags chat-controller
     * @name CreateRoom
     * @request POST:/api/rooms
     */
    createRoom: (query, params = {}) =>
      this.request({
        path: `/api/rooms`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags chat-controller
     * @name SaveMessage
     * @request POST:/api/rooms/{estimateNo}
     */
    saveMessage: (estimateNo, query, params = {}) =>
      this.request({
        path: `/api/rooms/${estimateNo}`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags review-controller
     * @name SaveReview
     * @request POST:/api/reviews
     */
    saveReview: (query, params = {}) =>
      this.request({
        path: `/api/reviews`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags report-controller
     * @name SaveReport
     * @request POST:/api/reports
     */
    saveReport: (query, params = {}) =>
      this.request({
        path: `/api/reports`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags payment-controller
     * @name Verify
     * @request POST:/api/payments/verify
     */
    verify: (query, params = {}) =>
      this.request({
        path: `/api/payments/verify`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags payment-controller
     * @name Prepare
     * @request POST:/api/payments/prepare
     */
    prepare: (query, params = {}) =>
      this.request({
        path: `/api/payments/prepare`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags payment-controller
     * @name Cancel
     * @request POST:/api/payments/cancel
     */
    cancel: (query, params = {}) =>
      this.request({
        path: `/api/payments/cancel`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name SignUp
     * @request POST:/api/members
     */
    signUp: (query, data, params = {}) =>
      this.request({
        path: `/api/members`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name WithdrawMember
     * @request DELETE:/api/members
     */
    withdrawMember: (data, params = {}) =>
      this.request({
        path: `/api/members`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags like-controller
     * @name ToggleLike
     * @request POST:/api/likes/{expertNo}
     */
    toggleLike: (expertNo, params = {}) =>
      this.request({
        path: `/api/likes/${expertNo}`,
        method: "POST",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertCategory
     * @request GET:/api/experts/registration
     */
    getExpertCategory: (params = {}) =>
      this.request({
        path: `/api/experts/registration`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name RegisterExpert
     * @request POST:/api/experts/registration
     */
    registerExpert: (query, params = {}) =>
      this.request({
        path: `/api/experts/registration`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name SaveEstimate
     * @request POST:/api/experts/estimate
     */
    saveEstimate: (query, params = {}) =>
      this.request({
        path: `/api/experts/estimate`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name GetEstimate
     * @request GET:/api/estimate
     */
    getEstimate: (query, params = {}) =>
      this.request({
        path: `/api/estimate`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name SaveEstimate1
     * @request POST:/api/estimate
     */
    saveEstimate1: (query, params = {}) =>
      this.request({
        path: `/api/estimate`,
        method: "POST",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags email-auth-controller
     * @name VerifyCode
     * @request POST:/api/emails/verifications
     */
    verifyCode: (data, params = {}) =>
      this.request({
        path: `/api/emails/verifications`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags email-auth-controller
     * @name SendVerificationCode
     * @request POST:/api/emails/verification-requests
     */
    sendVerificationCode: (data, params = {}) =>
      this.request({
        path: `/api/emails/verification-requests`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags auth-controller
     * @name Logout
     * @request POST:/api/auth/logout
     */
    logout: (data, params = {}) =>
      this.request({
        path: `/api/auth/logout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags auth-controller
     * @name Login
     * @request POST:/api/auth/login
     */
    login: (data, params = {}) =>
      this.request({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name GetMyProfile
     * @request GET:/api/members/me
     */
    getMyProfile: (params = {}) =>
      this.request({
        path: `/api/members/me`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags member-controller
     * @name UpdateMe
     * @request PATCH:/api/members/me
     */
    updateMe: (query, data, params = {}) =>
      this.request({
        path: `/api/members/me`,
        method: "PATCH",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
    /**
     * No description
     *
     * @tags chat-controller
     * @name GetMessages
     * @request GET:/api/rooms/{estimateNo}/messages
     */
    getMessages: (estimateNo, query, params = {}) =>
      this.request({
        path: `/api/rooms/${estimateNo}/messages`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags review-controller
     * @name GetAllReviewTags
     * @request GET:/api/reviews/tags
     */
    getAllReviewTags: (params = {}) =>
      this.request({
        path: `/api/reviews/tags`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags review-controller
     * @name GetExpertReviews
     * @request GET:/api/reviews/expert/{expertNo}
     */
    getExpertReviews: (expertNo, query, params = {}) =>
      this.request({
        path: `/api/reviews/expert/${expertNo}`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags report-controller
     * @name GetReport
     * @request GET:/api/reports/{estimateNo}
     */
    getReport: (estimateNo, params = {}) =>
      this.request({
        path: `/api/reports/${estimateNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags report-controller
     * @name GetAllReportTags
     * @request GET:/api/reports/tags
     */
    getAllReportTags: (params = {}) =>
      this.request({
        path: `/api/reports/tags`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags main-controller
     * @name GetExpertEntities
     * @request GET:/api/main
     */
    getExpertEntities: (params = {}) =>
      this.request({
        path: `/api/main`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertDetails
     * @request GET:/api/experts/{expertNo}
     */
    getExpertDetails: (expertNo, params = {}) =>
      this.request({
        path: `/api/experts/${expertNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertCategories
     * @request GET:/api/experts/{expertNo}/categories
     */
    getExpertCategories: (expertNo, params = {}) =>
      this.request({
        path: `/api/experts/${expertNo}/categories`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertsByNickname
     * @request GET:/api/experts/search
     */
    getExpertsByNickname: (query, params = {}) =>
      this.request({
        path: `/api/experts/search`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetMatchedUser
     * @request GET:/api/experts/matches
     */
    getMatchedUser: (query, params = {}) =>
      this.request({
        path: `/api/experts/matches`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetExpertMapLocations
     * @request GET:/api/experts/map
     */
    getExpertMapLocations: (query, params = {}) =>
      this.request({
        path: `/api/experts/map`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name GetLikedExperts
     * @request GET:/api/experts/likes
     */
    getLikedExperts: (query, params = {}) =>
      this.request({
        path: `/api/experts/likes`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name GetReceivedEstimateDetail
     * @request GET:/api/estimate/response/{requestNo}
     */
    getReceivedEstimateDetail: (requestNo, params = {}) =>
      this.request({
        path: `/api/estimate/response/${requestNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name GetReceivedRequests
     * @request GET:/api/estimate/requests
     */
    getReceivedRequests: (query, params = {}) =>
      this.request({
        path: `/api/estimate/requests`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name GetEsimateDetail
     * @request GET:/api/estimate/request/{requestNo}
     */
    getEsimateDetail: (requestNo, params = {}) =>
      this.request({
        path: `/api/estimate/request/${requestNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags estimate-controller
     * @name GetReceivedEstimates
     * @request GET:/api/estimate/receive
     */
    getReceivedEstimates: (query, params = {}) =>
      this.request({
        path: `/api/estimate/receive`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags category-controller
     * @name GetEntities
     * @request GET:/api/categories
     */
    getEntities: (params = {}) =>
      this.request({
        path: `/api/categories`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags category-controller
     * @name GetCategories
     * @request GET:/api/categories/{categoryNo}
     */
    getCategories: (categoryNo, params = {}) =>
      this.request({
        path: `/api/categories/${categoryNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags category-controller
     * @name GetExpertList
     * @request GET:/api/categories/experts/{categoryDetailNo}
     */
    getExpertList: (categoryDetailNo, query, params = {}) =>
      this.request({
        path: `/api/categories/experts/${categoryDetailNo}`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags cash-controller
     * @name GetMyCash
     * @request GET:/api/cash/me
     */
    getMyCash: (params = {}) =>
      this.request({
        path: `/api/cash/me`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-report-controller
     * @name GetReportList
     * @request GET:/api/admin/reports
     */
    getReportList: (query, params = {}) =>
      this.request({
        path: `/api/admin/reports`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-report-controller
     * @name GetReportDetail
     * @request GET:/api/admin/reports/{reportNo}
     */
    getReportDetail: (reportNo, params = {}) =>
      this.request({
        path: `/api/admin/reports/${reportNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-report-controller
     * @name GetReportsByTargetUser
     * @request GET:/api/admin/reports/target/{targetUserNo}
     */
    getReportsByTargetUser: (targetUserNo, query, params = {}) =>
      this.request({
        path: `/api/admin/reports/target/${targetUserNo}`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-member-controller
     * @name GetMemberList
     * @request GET:/api/admin/members
     */
    getMemberList: (query, params = {}) =>
      this.request({
        path: `/api/admin/members`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags admin-member-controller
     * @name GetMemberDetail
     * @request GET:/api/admin/members/{userNo}
     */
    getMemberDetail: (userNo, params = {}) =>
      this.request({
        path: `/api/admin/members/${userNo}`,
        method: "GET",
        ...params,
      }),
    /**
     * No description
     *
     * @tags expert-controller
     * @name DeleteExpertEstimateByRequestNo
     * @request DELETE:/api/experts/estimate/{requestNo}
     */
    deleteExpertEstimateByRequestNo: (requestNo, params = {}) =>
      this.request({
        path: `/api/experts/estimate/${requestNo}`,
        method: "DELETE",
        ...params,
      }),
  };
}
