import { RequestHandler, Router } from 'express';
import {
  createGroupSchema,
  groupJidSchema,
  updateParticipantsSchema,
  toggleEphemeralSchema,
  updateSettingsSchema,
  updateGroupPicture,
  groupInviteSchema,
} from '../../validate/validate.schema';
import { RouterBroker } from '../abstract/abstract.router';
import {
  CreateGroupDto,
  GroupJid,
  GroupInvite,
  GroupPictureDto,
  GroupUpdateParticipantDto,
  GroupToggleEphemeralDto,
  GroupUpdateSettingDto,
} from '../dto/group.dto';
import { groupController } from '../whatsapp.module';
import { HttpStatus } from './index.router';

export class GroupRouter extends RouterBroker {
  constructor(...guards: RequestHandler[]) {
    super();
    this.router
      .post(this.routerPath('create'), ...guards, async (req, res) => {
        const response = await this.dataValidate<CreateGroupDto>({
          request: req,
          schema: createGroupSchema,
          ClassRef: CreateGroupDto,
          execute: (instance, data) => groupController.createGroup(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('updateGroupPicture'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupPictureDto>({
          request: req,
          schema: updateGroupPicture,
          ClassRef: GroupPictureDto,
          execute: (instance, data) => groupController.updateGroupPicture(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .get(this.routerPath('findGroupInfos'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupJid>({
          request: req,
          schema: groupJidSchema,
          ClassRef: GroupJid,
          execute: (instance, data) => groupController.findGroupInfo(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('participants'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupJid>({
          request: req,
          schema: groupJidSchema,
          ClassRef: GroupJid,
          execute: (instance, data) => groupController.findParticipants(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('inviteCode'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupJid>({
          request: req,
          schema: groupJidSchema,
          ClassRef: GroupJid,
          execute: (instance, data) => groupController.inviteCode(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('inviteInfo'), ...guards, async (req, res) => {
        const response = await this.inviteCodeValidate<GroupInvite>({
          request: req,
          schema: groupInviteSchema,
          ClassRef: GroupInvite,
          execute: (instance, data) => groupController.inviteInfo(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .put(this.routerPath('revokeInviteCode'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupJid>({
          request: req,
          schema: groupJidSchema,
          ClassRef: GroupJid,
          execute: (instance, data) => groupController.revokeInviteCode(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('updateParticipant'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupUpdateParticipantDto>({
          request: req,
          schema: updateParticipantsSchema,
          ClassRef: GroupUpdateParticipantDto,
          execute: (instance, data) => groupController.updateGParticipate(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('updateSetting'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupUpdateSettingDto>({
          request: req,
          schema: updateSettingsSchema,
          ClassRef: GroupUpdateSettingDto,
          execute: (instance, data) => groupController.updateGSetting(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('toggleEphemeral'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupToggleEphemeralDto>({
          request: req,
          schema: toggleEphemeralSchema,
          ClassRef: GroupToggleEphemeralDto,
          execute: (instance, data) => groupController.toggleEphemeral(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .delete(this.routerPath('leaveGroup'), ...guards, async (req, res) => {
        const response = await this.groupValidate<GroupJid>({
          request: req,
          schema: {},
          ClassRef: GroupJid,
          execute: (instance, data) => groupController.leaveGroup(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      });
  }

  public readonly router = Router();
}
