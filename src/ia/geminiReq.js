async function geminiReq(query, context = "") {
  try {
    const response = await fetch("http://localhost:3001/api/generate-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Error desconocido del servidor");
    }

    return data.report;
  } catch (error) {
    console.error("Error en geminiReq:", error);
    throw error;
  }
}

export default geminiReq;