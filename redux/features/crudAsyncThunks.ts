/*************************************
 *  Created on Sat Feb 04 2023
 *
 *  Copyright (c) 2023 Yuji Sato
 * */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { AxiosResData } from '../../utils/axios-instance';

export const fetchCrudDocuments = createAsyncThunk(
  'cruds/fetchCrudDocuments',
  async ({ entity, query, isChildrenTree = false }: FetchCrudPayload) => {
    const res = await axiosInstance.get<AxiosResData>(`${entity}${query || ''}`);
    return {
      entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const addCrudDocument = createAsyncThunk(
  'crud/addDocument',
  async ({ entity, newDocument, parentId }: AddCrudPayload) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = !parentId ? entity : `linkedChildren/${entity}/${parentId}`;
    const res = await axiosInstance.post(endPoint, newDocument);
    return res.data;
  }
);

export const updateCrudDocument = createAsyncThunk(
  'crud/updateDocument',
  async ({ entity, updateData, documentId, parentId }: UpdateCrudPayload) => {
    /** parentId ? then linkedChildren endpoint. else case update normally */
    const endpoint = !parentId
      ? `${entity}/${documentId}`
      : `/linkedChildren/${entity}/${parentId}`;
    const res = await axiosInstance.put(endpoint, updateData);
    const payload = {
      entity: res.data.collection,
      updatedDocument: res.data.data as Record<string, any>,
    };
    return payload;
  }
);

export const deleteCrudDocument = createAsyncThunk(
  'crud/deleteDocument',
  async ({ entity, documentId, query = '' }: DeleteCrudPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(`${entity}/${documentId}${query}`);
    const payload = {
      entity: res.data.collection,
      documents: res.data.data,
      documentId,
      totalDocuments: res.data.totalDataLength,
    };
    return payload;
  }
);
