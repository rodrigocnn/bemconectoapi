import { sessionData } from "../_mocks_/session.mocks";
import { ISessionRepository } from "../repositories/session.repository";
import { SessionService } from "./session.service";

describe("ReservationService", () => {
  let mockSessionRepository: ISessionRepository;
  let sessionService: SessionService;

  beforeEach(() => {
    mockSessionRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    sessionService = new SessionService(mockSessionRepository);
  });

  describe("create", () => {
    it("should create a session successfully", async () => {
      const expectedSession = {
        id: "uuid-123",
        ...sessionData,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      (mockSessionRepository.create as jest.Mock).mockResolvedValue(
        expectedSession
      );

      const result = await sessionService.create(sessionData);

      expect(mockSessionRepository.create).toHaveBeenCalledWith(sessionData);
      expect(result).toEqual(expectedSession);
    });
  });

  describe("read", () => {
    it("should return all sessions", async () => {
      const sessions = [
        { id: "uuid-1", ...sessionData },
        { id: "uuid-2", ...sessionData },
      ];

      (mockSessionRepository.read as jest.Mock).mockResolvedValue(sessions);

      const psychologistId = sessionData.psychologistId;
      const patientId = sessionData.psychologistId;
      const result = await sessionService.read(psychologistId, patientId);

      expect(mockSessionRepository.read).toHaveBeenCalledWith(
        psychologistId,
        patientId
      );
      expect(result).toEqual(sessions);
    });
  });

  describe("show", () => {
    it("should return a session by id", async () => {
      const session = { id: "uuid-123", ...sessionData };

      (mockSessionRepository.show as jest.Mock).mockResolvedValue(session);

      const result = await sessionService.show("uuid-123");

      expect(mockSessionRepository.show).toHaveBeenCalledWith("uuid-123");
      expect(result).toEqual(session);
    });
  });

  describe("update", () => {
    it("should update a session successfully", async () => {
      const updatedSession = {
        ...sessionData,
      };

      (mockSessionRepository.update as jest.Mock).mockResolvedValue(
        updatedSession
      );

      const result = await sessionService.update("uuid-123", updatedSession);

      expect(mockSessionRepository.update).toHaveBeenCalledWith(
        "uuid-123",
        updatedSession
      );
      expect(result).toEqual(updatedSession);
    });
  });

  describe("delete", () => {
    it("should delete a session successfully", async () => {
      (mockSessionRepository.delete as jest.Mock).mockResolvedValue(true);

      const result = await sessionService.delete("uuid-123");

      expect(mockSessionRepository.delete).toHaveBeenCalledWith("uuid-123");
      expect(result).toBe(true);
    });
  });

  describe("exists", () => {
    it("should return true if session exists", async () => {
      (mockSessionRepository.exists as jest.Mock).mockResolvedValue(true);

      const result = await sessionService.exists("uuid-123");

      expect(mockSessionRepository.exists).toHaveBeenCalledWith("uuid-123");
      expect(result).toBe(true);
    });

    it("should return false if session does not exist", async () => {
      (mockSessionRepository.exists as jest.Mock).mockResolvedValue(false);

      const result = await sessionService.exists("uuid-999");

      expect(mockSessionRepository.exists).toHaveBeenCalledWith("uuid-999");
      expect(result).toBe(false);
    });
  });
});
