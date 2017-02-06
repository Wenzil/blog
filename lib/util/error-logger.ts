export function logError(err, ctx) {
  const lines = [
    `${ctx.method.toUpperCase()} ${ctx.path} (${ctx.status})`,
    ctx.status < 500
      ? err.toString()
      : err.stack,
    ctx.state.user
      ? `Session username: ${ctx.state.user.sub}`
      : '',
    ctx.request.body
      ? `Request payload: ${JSON.stringify(ctx.request.body, null, 2)}`
      : '',
    ctx.body
      ? `Response payload: ${JSON.stringify(ctx.body, null, 2)}`
      : ''
  ]
    .filter((line) => !!line);

  const formattedError = lines.join('\n') + '\n';

  if (ctx.status < 500) {
    console.warn(formattedError);
  } else {
    console.error(formattedError);
  }
}