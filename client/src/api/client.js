import axios from 'axios';
import { api } from './config';

export async function analyzeEligibility(intake, language) {
  const response = await axios.post(api.analyzeEligibility, { intake, language });
  return response.data;
}

export async function createShareLink(intake, results, language) {
  const response = await axios.post(api.shareResults, { intake, results, language });
  return response.data;
}

export async function getSharedResults(sessionId) {
  const response = await axios.get(api.getSharedResults(sessionId));
  return response.data;
}

export async function fetchResources(params = {}) {
  const response = await axios.get(api.getResources, { params });
  return response.data;
}

export async function fetchNearbyResources(params = {}) {
  const response = await axios.get(api.getNearbyResources, { params });
  return response.data;
}
