/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createSponsorRouter from "./Sponsor.router";
import createInstallmentPlanRouter from "./InstallmentPlan.router";
import createEventRouter from "./Event.router";
import createFundraisingCampaignRouter from "./FundraisingCampaign.router";
import createMemberRoleRouter from "./MemberRole.router";
import createPaymentRouter from "./Payment.router";
import createEventRegistrationRouter from "./EventRegistration.router";
import createExpenseRequestRouter from "./ExpenseRequest.router";
import createTransactionRouter from "./Transaction.router";
import createUserRouter from "./User.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as SponsorClientType } from "./Sponsor.router";
import { ClientType as InstallmentPlanClientType } from "./InstallmentPlan.router";
import { ClientType as EventClientType } from "./Event.router";
import { ClientType as FundraisingCampaignClientType } from "./FundraisingCampaign.router";
import { ClientType as MemberRoleClientType } from "./MemberRole.router";
import { ClientType as PaymentClientType } from "./Payment.router";
import { ClientType as EventRegistrationClientType } from "./EventRegistration.router";
import { ClientType as ExpenseRequestClientType } from "./ExpenseRequest.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        sponsor: createSponsorRouter(router, procedure),
        installmentPlan: createInstallmentPlanRouter(router, procedure),
        event: createEventRouter(router, procedure),
        fundraisingCampaign: createFundraisingCampaignRouter(router, procedure),
        memberRole: createMemberRoleRouter(router, procedure),
        payment: createPaymentRouter(router, procedure),
        eventRegistration: createEventRegistrationRouter(router, procedure),
        expenseRequest: createExpenseRequestRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        user: createUserRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    sponsor: SponsorClientType<AppRouter>;
    installmentPlan: InstallmentPlanClientType<AppRouter>;
    event: EventClientType<AppRouter>;
    fundraisingCampaign: FundraisingCampaignClientType<AppRouter>;
    memberRole: MemberRoleClientType<AppRouter>;
    payment: PaymentClientType<AppRouter>;
    eventRegistration: EventRegistrationClientType<AppRouter>;
    expenseRequest: ExpenseRequestClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
