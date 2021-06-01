import axios from 'axios';

export async function getCommits(page = 1) {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/git/commits', {
      params: { page: page }
    });

    if(!response.data) {
      throw new Error('No data');
    }

    if(!Array.isArray(response.data.data)) {
      throw new Error('Invalid data');
    }

    return response.data.data;
  } catch (error) {
    console.error(error.message);
    alert('Error getting commit information');
    return null;
  }

}