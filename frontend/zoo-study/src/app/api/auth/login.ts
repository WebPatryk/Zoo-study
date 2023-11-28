export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // try {
  //   const { data } = await fetch(
  //     'http://localhost:3001/auth/login',
  //     req.body
  //   );
  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(error.response?.status || 500).json({ error: error.message });
  // }
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    res.status(200).json(response);
  } catch (error) {
    console.error('Login failed', error);
  }
}
