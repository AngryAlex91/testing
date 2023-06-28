export const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.status === 404 ?'Id does not exist' :'Network problems');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Some problems');
      throw error;
    }
  }