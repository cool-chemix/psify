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

        createMany: procedure.input($Schema.EventRegistrationInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.createMany(input as any))),

        create: procedure.input($Schema.EventRegistrationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.create(input as any))),

        deleteMany: procedure.input($Schema.EventRegistrationInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.deleteMany(input as any))),

        delete: procedure.input($Schema.EventRegistrationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.delete(input as any))),

        findFirst: procedure.input($Schema.EventRegistrationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).eventRegistration.findFirst(input as any))),

        findMany: procedure.input($Schema.EventRegistrationInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).eventRegistration.findMany(input as any))),

        findUnique: procedure.input($Schema.EventRegistrationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).eventRegistration.findUnique(input as any))),

        updateMany: procedure.input($Schema.EventRegistrationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.updateMany(input as any))),

        update: procedure.input($Schema.EventRegistrationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).eventRegistration.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EventRegistrationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EventRegistrationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventRegistrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventRegistrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventRegistrationGetPayload<T>, Context>) => Promise<Prisma.EventRegistrationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EventRegistrationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EventRegistrationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventRegistrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventRegistrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventRegistrationGetPayload<T>, Context>) => Promise<Prisma.EventRegistrationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EventRegistrationFindFirstArgs, TData = Prisma.EventRegistrationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EventRegistrationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EventRegistrationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventRegistrationFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventRegistrationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EventRegistrationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EventRegistrationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EventRegistrationFindManyArgs, TData = Array<Prisma.EventRegistrationGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EventRegistrationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EventRegistrationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventRegistrationFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventRegistrationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EventRegistrationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EventRegistrationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EventRegistrationFindUniqueArgs, TData = Prisma.EventRegistrationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EventRegistrationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EventRegistrationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EventRegistrationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EventRegistrationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EventRegistrationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EventRegistrationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EventRegistrationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EventRegistrationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EventRegistrationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EventRegistrationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EventRegistrationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EventRegistrationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EventRegistrationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EventRegistrationGetPayload<T>, Context>) => Promise<Prisma.EventRegistrationGetPayload<T>>
            };

    };
}
