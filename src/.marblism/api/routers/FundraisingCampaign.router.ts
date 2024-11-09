/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.FundraisingCampaignInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.createMany(input as any))),

        create: procedure.input($Schema.FundraisingCampaignInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.create(input as any))),

        deleteMany: procedure.input($Schema.FundraisingCampaignInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.deleteMany(input as any))),

        delete: procedure.input($Schema.FundraisingCampaignInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.delete(input as any))),

        findFirst: procedure.input($Schema.FundraisingCampaignInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).fundraisingCampaign.findFirst(input as any))),

        findMany: procedure.input($Schema.FundraisingCampaignInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).fundraisingCampaign.findMany(input as any))),

        findUnique: procedure.input($Schema.FundraisingCampaignInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).fundraisingCampaign.findUnique(input as any))),

        updateMany: procedure.input($Schema.FundraisingCampaignInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.updateMany(input as any))),

        update: procedure.input($Schema.FundraisingCampaignInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).fundraisingCampaign.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FundraisingCampaignCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FundraisingCampaignCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FundraisingCampaignGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FundraisingCampaignGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FundraisingCampaignGetPayload<T>, Context>) => Promise<Prisma.FundraisingCampaignGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FundraisingCampaignDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FundraisingCampaignDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FundraisingCampaignGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FundraisingCampaignGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FundraisingCampaignGetPayload<T>, Context>) => Promise<Prisma.FundraisingCampaignGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FundraisingCampaignFindFirstArgs, TData = Prisma.FundraisingCampaignGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FundraisingCampaignGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FundraisingCampaignFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FundraisingCampaignGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FundraisingCampaignGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FundraisingCampaignFindManyArgs, TData = Array<Prisma.FundraisingCampaignGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FundraisingCampaignGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FundraisingCampaignFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FundraisingCampaignGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FundraisingCampaignGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FundraisingCampaignFindUniqueArgs, TData = Prisma.FundraisingCampaignGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FundraisingCampaignGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FundraisingCampaignFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FundraisingCampaignFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FundraisingCampaignGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FundraisingCampaignGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FundraisingCampaignUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FundraisingCampaignUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FundraisingCampaignUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FundraisingCampaignGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FundraisingCampaignGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FundraisingCampaignUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FundraisingCampaignUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FundraisingCampaignGetPayload<T>, Context>) => Promise<Prisma.FundraisingCampaignGetPayload<T>>
            };

    };
}
