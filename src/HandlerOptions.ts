import express from "express";

class HandlerOptions {
  public noReply: boolean = false;
  public onRequest?: (req: express.Request | undefined) => void = undefined;
  public statusCode: number = 200;
}

export default HandlerOptions;
