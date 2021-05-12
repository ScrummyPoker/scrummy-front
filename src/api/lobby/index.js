import axios from 'axios';
import { getUserToken } from '../../services/auth';
import { postWithToken } from '../config';

export const createLobby = async lobbyData =>
  await postWithToken({
    method: 'POST',
    url: process.env.REACT_APP_API_URL + 'lobby',
    data: lobbyData,
  });

export const getLobbyByCode = async lobbyCode =>
  await postWithToken({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyCode}`,
  });

export const enterLobbyByCode = async lobbyData =>
  await postWithToken({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyData.lobbyCode}/enter`,
    data: lobbyData,
  });

export const leaveLobbyByCode = async lobbyCode =>
  await postWithToken({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyCode}/leave`,
  });

export const deleteLobbyByCode = async lobbyData =>
  await postWithToken({
    method: 'DELETE',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyData.lobbyCode}`,
    data: lobbyData,
  });

export const addAdminToLobby = async lobbyCode =>
  await postWithToken({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyCode}/addAdmin`,
  });

export const removeAdminFromLobby = async lobbyCode =>
  await postWithToken({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}lobby/${lobbyCode}/removeAdmin`,
  });
