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

        createMany: procedure.input($Schema.SponsorInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.createMany(input as any))),

        create: procedure.input($Schema.SponsorInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.create(input as any))),

        deleteMany: procedure.input($Schema.SponsorInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.deleteMany(input as any))),

        delete: procedure.input($Schema.SponsorInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.delete(input as any))),

        findFirst: procedure.input($Schema.SponsorInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).sponsor.findFirst(input as any))),

        findMany: procedure.input($Schema.SponsorInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).sponsor.findMany(input as any))),

        findUnique: procedure.input($Schema.SponsorInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).sponsor.findUnique(input as any))),

        updateMany: procedure.input($Schema.SponsorInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.updateMany(input as any))),

        update: procedure.input($Schema.SponsorInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).sponsor.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SponsorCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SponsorCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SponsorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SponsorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SponsorGetPayload<T>, Context>) => Promise<Prisma.SponsorGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SponsorDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SponsorDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SponsorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SponsorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SponsorGetPayload<T>, Context>) => Promise<Prisma.SponsorGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SponsorFindFirstArgs, TData = Prisma.SponsorGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SponsorFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SponsorGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SponsorFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SponsorFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SponsorGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SponsorGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SponsorFindManyArgs, TData = Array<Prisma.SponsorGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.SponsorFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SponsorGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SponsorFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SponsorFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SponsorGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SponsorGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SponsorFindUniqueArgs, TData = Prisma.SponsorGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SponsorFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SponsorGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SponsorFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SponsorFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SponsorGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SponsorGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SponsorUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SponsorUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SponsorUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SponsorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SponsorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SponsorUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SponsorUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SponsorGetPayload<T>, Context>) => Promise<Prisma.SponsorGetPayload<T>>
            };

    };
}
