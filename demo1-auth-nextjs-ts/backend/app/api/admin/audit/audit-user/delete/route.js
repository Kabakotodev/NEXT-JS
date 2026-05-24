export async function DELETE(req) {
  try {
    await verifyAdmin(req);

    const { logIds } = await req.json();

    await prisma.auditActionUser.deleteMany({
      where: {
        id: { in: logIds }
      }
    });

    return Response.json({
      message: "Logs supprimés"
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}