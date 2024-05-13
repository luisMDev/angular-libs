import { Injectable } from '@angular/core';
import {
  DocumentChangeType,
  Firestore,
  Query,
  QueryConstraint,
  collection,
  collectionChanges,
  collectionData,
  collectionSnapshots,
  deleteDoc,
  doc,
  docData,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const production = false;

@Injectable({
  providedIn: 'root',
})
export class NgxFireService {
  constructor(public firestore: Firestore) {}

  public collectionSnapshot$<T>(basePath: string, queryFn: QueryConstraint[] = []): Observable<T[]> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    const collectionRef = collection(this.firestore, `${basePath}`);

    const appQuery: Query = query(collectionRef, ...queryFn);

    const collectionSnapshots$ = collectionSnapshots(appQuery) as Observable<T[]>;

    return collectionSnapshots$.pipe(
      // filter((actions: DocumentChangeAction<T>[]) => {
      //   let hasPendingWrites = false;
      //   // let fromCache = false;
      //   actions.forEach((a: DocumentChangeAction<T>) => {
      //     if (a.payload.doc.metadata.hasPendingWrites) {
      //       hasPendingWrites = true;
      //     }
      //     // if (a.payload.doc.metadata.fromCache) {
      //     //   fromCache = true;
      //     // }
      //   });
      //   return !hasPendingWrites;
      // }),
      // map((actions: DocumentChangeAction<T>[]) =>
      //   actions.map((a: DocumentChangeAction<T>) => {
      //     const data: T = a.payload.doc.data();
      //     const { id } = a.payload.doc;
      //     return { ...data, id };
      //   }),
      // ),
      tap((r) => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ CollectionSnapshot$ ~ ${basePath}`);
          console.table(r);
          console.groupEnd();
        }
      }),
      catchError((error) => {
        console.groupCollapsed(`📂 ~ Firestore service Error ~ Collection$ ~ ${basePath}`);
        console.error(error);
        console.groupEnd();
        throw error;
      }),
    );
  }

  public collectionSnapshot<T>(basePath: string, queryFn: QueryConstraint[] = []): Promise<T[]> {
    return firstValueFrom(this.collectionSnapshot$<T>(basePath, queryFn));
  }

  public createId(): string {
    const id: string = 'asd';
    console.log(`📂 ~ Firestore service ~ Create Id ~ ${id}`);

    return id;
  }

  public stateChanges$<T>(basePath: string, queryFn: QueryConstraint[] = [], events: DocumentChangeType[] = []): Observable<T[]> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    const collectionRef = collection(this.firestore, `${basePath}`);

    const appQuery: Query = query(collectionRef, ...queryFn);

    const collectionChanges$ = collectionChanges(appQuery, {
      events,
    }) as Observable<T[]>;

    return collectionChanges$.pipe(
      tap((r) => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ CollectionSnapshot$ ~ ${basePath} ~ ${events}`);
          console.table(r);
          console.groupEnd();
        }
      }),
      catchError((error) => {
        console.groupCollapsed(`📂 ~ Firestore service Error ~ Collection$ ~ ${basePath} ~ ${events}`);
        console.error(error);
        console.groupEnd();
        throw error;
      }),
    );
  }

  public stateChanges<T>(basePath: string, queryFn: QueryConstraint[] = [], events: DocumentChangeType[] = []): Promise<T[]> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    return firstValueFrom(this.stateChanges$<T>(basePath, queryFn, events));
  }

  public onDocumentAdded$<T>(basePath: string, queryFn: QueryConstraint[] = []): Observable<T[]> {
    return this.stateChanges$(basePath, queryFn, ['added']);
  }

  public onDocumentAdded<T>(basePath: string, queryFn: QueryConstraint[] = []): Promise<T[]> {
    return firstValueFrom(this.onDocumentAdded$<T>(basePath, queryFn));
  }

  public onDocumentModified$<T>(basePath: string, queryFn: QueryConstraint[] = []): Observable<T[]> {
    return this.stateChanges$(basePath, queryFn, ['modified']);
  }

  public onDocumentModified<T>(basePath: string, queryFn: QueryConstraint[] = []): Promise<T[]> {
    return firstValueFrom(this.onDocumentModified$<T>(basePath, queryFn));
  }

  public onDocumentRemoved$<T>(basePath: string, queryFn: QueryConstraint[] = []): Observable<T[]> {
    return this.stateChanges$(basePath, queryFn, ['removed']);
  }

  public onDocumentRemoved<T>(basePath: string, queryFn: QueryConstraint[] = []): Promise<T[]> {
    return firstValueFrom(this.onDocumentRemoved$<T>(basePath, queryFn));
  }

  // NEW

  public collection$<T>(basePath: string, queryFn: QueryConstraint[] = [], idField: string = 'id'): Observable<T[]> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    const collectionRef = collection(this.firestore, `${basePath}`);

    const appQuery: Query = query(collectionRef, ...queryFn);

    const collection$ = collectionData(appQuery, { idField }) as Observable<T[]>;

    return collection$.pipe(
      tap((r) => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Collection$ ~ ${basePath}`);
          console.table(r);
          console.groupEnd();
        }
      }),
      catchError((error) => {
        console.groupCollapsed(`📂 ~ Firestore service Error ~ Collection$ ~ ${basePath}`);
        console.error(error);
        console.groupEnd();
        throw error;
      }),
    );
  }

  public collection<T>(basePath: string, queryFn?: QueryConstraint[], idField: string = 'id'): Promise<T[]> {
    return firstValueFrom(this.collection$<T>(basePath, queryFn, idField));
  }

  public doc$<T>(basePath: string): Observable<T> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    const docRef = doc(this.firestore, basePath);
    const doc$ = docData(docRef) as Observable<T>;

    return doc$.pipe(
      tap((r) => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Doc$ ~ ${basePath}`);
          console.log(r);
          console.groupEnd();
        }
      }),
      catchError((error) => {
        console.groupCollapsed(`📂 ~ Firestore service Error ~ Doc$ ~ ${basePath}`);
        console.error(error);
        console.groupEnd();
        throw error;
      }),
    );
  }

  public doc<T>(basePath: string): Promise<T> {
    return firstValueFrom(this.doc$<T>(basePath));
  }

  public add<T>(basePath: string, value: T): Promise<void> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    if (!value) {
      throw new Error('value is required');
    }

    const docRef = doc(this.firestore, `${basePath}`);
    const id = docRef.id;

    return setDoc(docRef, { id, ...value })
      .then(() => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Create ~ ${basePath}`);
          console.log('[Id]', id);
          console.log('[Value]', value);
          console.groupEnd();
        }
      })
      .catch((error) => {
        console.groupCollapsed(`📂 ~ Firestore service ~ Set ~ ${basePath}`);
        console.error(error);
        console.error('[Id]', id);
        console.error('[Value]', value);
        console.groupEnd();
        throw error;
      });
  }

  public update<T>(basePath: string, value: T): Promise<void> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    if (!value) {
      throw new Error('value is required');
    }

    const docRef = doc(this.firestore, `${basePath}`);

    return updateDoc(docRef, { ...value })
      .then(() => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Update ~ ${basePath}`);
          console.log('[Value]', value);
          console.groupEnd();
        }
      })
      .catch((error) => {
        console.groupCollapsed(`📂 ~ Firestore service ~ Update ~ ${basePath}`);
        console.error(error);
        console.error('[Value]', value);
        console.groupEnd();
        throw error;
      });
  }

  public set<T>(basePath: string, value: T, merge: boolean = true): Promise<void> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    if (!value) {
      throw new Error('value is required');
    }

    const docRef = doc(this.firestore, `${basePath}`);

    return setDoc(docRef, { ...value })
      .then(() => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Set ~ ${basePath}`);
          console.log('[Value]', value);
          console.groupEnd();
        }
      })
      .catch((error) => {
        console.groupCollapsed(`📂 ~ Firestore service ~ Set ~ ${basePath}`);
        console.error(error);
        console.error('[Value]', value);
        console.groupEnd();
        throw error;
      });
  }

  public delete(basePath: string, id: string): Promise<void> {
    if (!basePath) {
      throw new Error('basePath is required');
    }

    if (!id) {
      throw new Error('id is required');
    }

    const docRef = doc(this.firestore, `${basePath}`);

    return deleteDoc(docRef)
      .then(() => {
        if (!production) {
          console.groupCollapsed(`📂 ~ Firestore service ~ Delete ~ ${basePath}`);
          console.log('[Id]', id);
          console.groupEnd();
        }
      })
      .catch((error) => {
        console.groupCollapsed(`📂 ~ Firestore service ~ Set ~ ${basePath}`);
        console.error(error);
        console.error('[Id]', id);
        console.groupEnd();
        throw error;
      });
  }
}
